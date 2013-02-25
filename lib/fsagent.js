var fs = require('fs')
  , path = require('path');

exports.version = '0.3.0';

exports.exists = fs.exists || path.exists;
exports.existsSync = fs.existsSync || path.existsSync;

exports.copy = require('./fsagent/copy');
exports.mkdirp = require('./fsagent/mkdir');
exports.rimraf = require('./fsagent/rmdir');
exports.tree = require('./fsagent/tree');
exports.watcher = require('./fsagent/watch');

exports.isPathAbsolute = function (_path) {
  var abs = false;
  if ('/' == _path[0]) abs = true;
  if (':' == _path[1] && '\\' == _path[2]) abs = true;
  return abs;
};

defaults(exports, fs);

function defaults (a, b) {
  for (var key in b) {
    if ('undefined' == typeof a[key])
      a[key] = b[key];
  }
  return a;
};
