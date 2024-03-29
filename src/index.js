#!/usr/bin/env node

const http = require('http');
const { resolve } = require('path');

const chalk = require('chalk');
const fs = require('fs-extra');
const morgan = require('morgan');

const { version } = require('../package.json');
const args = require('./args');

const { sendFile } = require('./handlers/file');
const { showIndex } = require('./handlers/index');
const { showNotFound } = require('./handlers/notFound');


process.stdout.write(chalk.bold(`μserve v${version}\n`));
process.stdout.write(`Serving directory: ${chalk.bold(resolve(args.path))}\n`);

process.on('SIGINT', () => {
  process.stdout.write('Received signal SIGINT\n');
  process.stdout.write('Server shutting down\n');
  process.exit(0);
});

const logger = args.logFormat !== 'none' ? morgan(args.logFormat) : (req, res, callback) => callback();

async function requestHandler(request, response) {
  logger(request, response, async err => {
    const resourcePath = request.url.startsWith('/__userve') ? getInternalPath(request.url) : resolve(args.path, request.url.substring(1));

    try {
      if (request.url === '/__userve') {
        throw { code: 'ENOENT' };
      }
      
      const fileStat = await fs.stat(resourcePath);
  
      if (fileStat.isDirectory()) {
        showIndex(resourcePath, request, response);
      } else {
        sendFile(resourcePath, request, response);
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        showNotFound(request, response);
      }
    }
  })
}

const server = http.createServer(requestHandler);

server.listen(args.port, err => {
  if (err) {
    return process.stderr.write('Failed to start the server', err);
  }

  process.stdout.write(`Server listening on port ${chalk.bold(args.port)}\n\n`);
});

function getInternalPath(url) {
  const internalPath = url.split('/').slice(2);
  return resolve(__dirname, 'static', internalPath.join('/'));
}
