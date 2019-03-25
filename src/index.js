#!/usr/bin/env node

const http = require('http');
const { resolve } = require('path');

const chalk = require('chalk');

const { version } = require('../package.json');
const args = require('./args');

process.stdout.write(chalk.bold(`μserve v${version}\n`));
process.stdout.write(`Serving directory: ${chalk.bold(resolve(args.path))}\n`);

process.on('SIGINT', () => {
  process.stdout.write('Received signal SIGINT\n');
  process.stdout.write('Server shutting down\n');
  process.exit(0);
});

function requestHandler(request, response) {
  response.end('Hello world!');
}

const server = http.createServer(requestHandler);

server.listen(args.port, err => {
  if (err) {
    return process.stderr.write('Failed to start the server', err);
  }

  process.stdout.write(`Server listening on port ${chalk.bold(args.port)}\n`);
});
