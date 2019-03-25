#!/usr/bin/env node

const http = require('http');
const { resolve } = require('path');

const chalk = require('chalk');
const fs = require('fs-extra');

const { version } = require('../package.json');
const args = require('./args');

const { showIndex } = require('./handlers/index');
const { showNotFound } = require('./handlers/notFound');

process.stdout.write(chalk.bold(`μserve v${version}\n`));
process.stdout.write(`Serving directory: ${chalk.bold(resolve(args.path))}\n`);

process.on('SIGINT', () => {
  process.stdout.write('Received signal SIGINT\n');
  process.stdout.write('Server shutting down\n');
  process.exit(0);
});

async function requestHandler(request, response) {
  const resourcePath = resolve(args.path, request.url.substring(1));

  try {
    const fileStat = await fs.stat(resourcePath);

    if (fileStat.isDirectory()) {
      return showIndex(resourcePath, request, response);
    }

    response.end('Hello world!');
  } catch (err) {
    if (err.code === 'ENOENT') {
      return showNotFound(request, response);
    }
  }
}

const server = http.createServer(requestHandler);

server.listen(args.port, err => {
  if (err) {
    return process.stderr.write('Failed to start the server', err);
  }

  process.stdout.write(`Server listening on port ${chalk.bold(args.port)}\n`);
});
