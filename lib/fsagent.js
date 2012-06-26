var fs = require('fs')
  , path = require('path');

exports.version = '0.1.0';

exports.exists = fs.exists || path.exists;
exports.existsSync = fs.existsSync || path.existsSync;

exports.mkdirp = require('./fsagent/mkdir');
exports.rimraf = require('./fsagent/rmdir');
exports.watcher = require('./fsagent/watch');

defaults(exports, fs);

function defaults (a, b) {
  for (var key in b) {
    if ('undefined' == typeof a[key])
      a[key] = b[key];
  }
  return a;
};
