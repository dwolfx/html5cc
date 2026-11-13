const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIR = __dirname;

const MIME = {
  '.html': 'text/html; charset=UTF-8',
  '.htm': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'bimage/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.zip': 'application/zip'
};

const server = http.createServer((req, res) => {
  let u = req.url.split('?')[0];
  let p = path.normalize(decodeURIComponent(u)).replace(/^(\.\.[/\\])+/, '');
  if (p === '/' || p === '\\') p = '/index.html';
  let f = path.join(DIR, p);

  fs.stat(f, (err, stats) => {
    if (!err && stats.isDirectory()) {
      f = path.join(f, 'index.html');
    }
    fs.readFile(f, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Not Found');
        return;
      }
      let ext = path.extname(f).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log('HTML5CC Server running at http://localhost:' + PORT);
});