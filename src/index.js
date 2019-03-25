#!/usr/bin/env node

const chalk = require('chalk');

const { version } = require('../package.json');

process.stdout.write('--------------------------------------\n');
process.stdout.write(chalk.bold(`μserve v${version}\n`));
process.stdout.write('--------------------------------------\n');
