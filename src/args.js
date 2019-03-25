const argv = require('yargs')
  .usage('userve: Serve the specified path over HTTP.\n$0 [path] [options]')
  .option('port', {
    alias: 'p',
    describe: 'The port number to listen on',
    default: 8080
  })
  .option('log-format', {
    alias: 'l',
    describe: 'The log format to use',
    choices: ['none', 'combined', 'common', 'dev', 'short', 'tiny'],
    default: 'common'
  })
  .argv;

const arguments = {};

arguments.path = argv._[0] || '.';

const port = parseInt(argv.port);
if (isNaN(port)) {
  process.stderr.write('Port must be a number\n');
  process.exit(1);
}
arguments.port = port;

arguments.logFormat = argv.logFormat;

module.exports = arguments;
