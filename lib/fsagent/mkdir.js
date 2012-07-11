var fs = require('fs')
  , path = require('path')
  , exists = fs.exists || path.exists;

module.exports = function mkdir (_path, mode, cb) {
  if ('function' === typeof mode) {
    cb = mode;
    mode = 0755;
  }

  cb = cb || function () {};
  _path = path.resolve(_path);

  function _mkdir (p, next) {
    exists(p, function (ex) {
      if (ex) return next();
      _mkdir(path.resolve(p, '..'), function (err) {
        if (err) return next(err);
        fs.mkdir(p, mode, function (err) {
          if (err && err.code !== 'EEXIST') return next(err);
          next();
        });
      });
    });
  }

  _mkdir(_path, function(err) {
    if (err) return cb(err);
    cb(null);
  });
};
