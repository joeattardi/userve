const fs = require('fs-extra');

exports.sendFile = async function sendFile(resourcePath, request, response) {
  const fileContents = await fs.readFile(resourcePath);

  const mimeType = mimeTypes[resourcePath.split('.').slice(-1)];

  if (mimeType) {
    response.setHeader('Content-Type', mimeType);
  }
  response.end(fileContents);
};

const mimeTypes = {
  'css': 'text/css',
  'csv': 'text/csv',
  'gif': 'image/gif',
  'html': 'text/html',
  'htm': 'text/html',
  'ico': 'image/vnd.microsoft.icon',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'js': 'text/javascript',
  'json': 'application/json',
  'mjs': 'text/javascript',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'rtf': 'application/rtf',
  'svg': 'image/svg+xml',
  'svgz': 'image/svg+xml',
  'txt': 'text/plain',
  'xhtml': 'application/xhtml+xml',
  'xml': 'text/xml',
  'zip': 'application/zip'
}
