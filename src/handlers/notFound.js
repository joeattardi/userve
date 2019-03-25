const fs = require('fs-extra');
const path = require('path');

const ejs = require('ejs');

exports.showNotFound = async function(request, response) {
  const templateSource = await fs.readFile(path.join(__dirname, '..', 'templates', 'notFound.ejs'), { encoding: 'UTF-8' });

  response.writeHead(404);
  return response.end(ejs.render(templateSource));
};
