const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 3000);

function decodeXmlEntities(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractTagValue(xmlChunk, tagName) {
  const re = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = xmlChunk.match(re);
  return match ? decodeXmlEntities(match[1].trim()) : '';
}

function parsePlaylistFeed(xml, maxItems) {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/gi) || [];
  const items = [];
  for (const entry of entries) {
    if (items.length >= maxItems) break;
    const id = extractTagValue(entry, 'yt:videoId');
    if (!id) continue;
    const title = extractTagValue(entry, 'title') || 'Untitled';
    items.push({ id, title });
  }
  return items;
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          response.resume();
          reject(new Error(`Upstream status ${response.statusCode}`));
          return;
        }

        let raw = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
          raw += chunk;
        });
        response.on('end', () => resolve(raw));
      })
      .on('error', reject);
  });
}

// MIME types for common file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

// Read SSL certificates
let options = {};
try {
  options = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
  };
} catch (err) {
  console.warn('SSL certificates not found. Falling back to HTTP.');
}

const requestHandler = async (req, res) => {
  const requestUrl = new URL(req.url, 'http://localhost');

  if (requestUrl.pathname === '/api/youtube-playlist') {
    const playlistId = String(requestUrl.searchParams.get('playlistId') || '').trim();
    const requestedMax = Number(requestUrl.searchParams.get('maxItems') || 50);
    const maxItems = Math.min(100, Math.max(1, Number.isFinite(requestedMax) ? requestedMax : 50));

    if (!playlistId) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing playlistId query parameter.' }));
      return;
    }

    try {
      const feedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(playlistId)}`;
      const xml = await fetchText(feedUrl);
      const items = parsePlaylistFeed(xml, maxItems);
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=120'
      });
      res.end(JSON.stringify({ source: 'youtube-feed', items }));
    } catch (error) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unable to fetch YouTube playlist feed.', details: error.message }));
    }
    return;
  }

  // Remove query parameters and decode URI
  let filePath = decodeURIComponent(requestUrl.pathname);

  // Default to index.html for root path
  if (filePath === '/') {
    filePath = '/index.html';
  }

  // Prevent directory traversal attacks
  filePath = path.join(__dirname, filePath);
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Get file extension and MIME type
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1><p>The requested file could not be found.</p>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 - Internal Server Error</h1><p>An error occurred while processing your request.</p>');
      }
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
};

// Prefer HTTPS on the main dev port when certs are available.
let server;
if (options.key && options.cert) {
  server = https.createServer(options, requestHandler);
  console.log(`HTTPS Server running at https://localhost:${PORT}`);
} else {
  server = http.createServer(requestHandler);
  console.log(`HTTP Server running at http://localhost:${PORT}`);
}

server.listen(PORT, () => {
  console.log('Press Ctrl+C to stop the server');
});