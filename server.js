const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

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

const requestHandler = (req, res) => {
  // Remove query parameters and decode URI
  let filePath = decodeURIComponent(req.url.split('?')[0]);

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

// Try HTTPS first, fallback to HTTP
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