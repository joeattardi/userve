const fs = require('fs-extra');
const path = require('path');

const ejs = require('ejs');

exports.showIndex = async function showIndex(resourcePath, request, response) {
  const templateSource = await fs.readFile(path.join(__dirname, '..', 'templates', 'index.ejs'), { encoding: 'UTF-8' });

  const files = await fs.readdir(resourcePath, { withFileTypes: true });

  files.sort((file1, file2) => {
    if (file1.isDirectory() && file2.isDirectory()) {
      return file1.name.localeCompare(file2.name);
    } else if (file1.isDirectory()) {
      return -1;
    } else if (file2.isDirectory()) {
      return 1;
    }
  });

  let basePath = request.url.indexOf('/') === 0 ? request.url.substring(1) : request.url;
  
  let upPath = null;
  if (basePath !== '') {
    basePath = `/${basePath}`;
    const pathComponents = basePath.split(path.sep);
    upPath = path.join(...pathComponents.slice(0, pathComponents.length - 1));
  }

  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  return response.end(ejs.render(templateSource, { 
    url: request.url,
    basePath,
    upPath,
    files,
    icons,
    extension
  }));
};

function extension(filename) {
  return filename.split('.').slice(-1);
}

const icons = {
  'css': 'fab fa-css3',
  'Dockerfile': 'fab fa-docker',
  'gif': 'far fa-image',
  'gitignore': 'fab fa-git',
  'html': 'fab fa-html5',
  'htm': 'fab fa-html5',
  'ico': 'far fa-image',
  'java': 'fab fa-java',
  'jpg': 'far fa-image',
  'js': 'fab fa-js',
  'json': 'fab fa-js',
  'pdf': 'fas fa-file-pdf',
  'php': 'fab fa-php',
  'png': 'far fa-image',
  'py': 'fab fa-python',
  'sass': 'fab fa-sass',
  'scss': 'fab fa-sass',
  'svg': 'far fa-image'
};
