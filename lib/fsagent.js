var fs = require('fs')
  , path = require('path');

exports.version = '0.1.0';

exports.exists = path.exists || fs.exists;
exports.existsSync = path.existsSync || fs.existsSync;

exports.mkdir = require('./fsagent/mkdir');
exports.rmdir = require('./fsagent/rmdir');
exports.watch = require('./fsagent/watch');
