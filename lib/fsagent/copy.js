var fs = require('fs');

module.exports = function copy (source, target, cb) {
  var ex = false
    , input = fs.createReadStream(source)
    , output = fs.createWriteStream(target);

  // handle callbacks
  function done (err) {
    if (ex) return;
    ex = true;
    cb(err);
  }

  // listeners
  input.on('error', done);
  output.on('error', done);
  output.on('close', done);

  // pipe
  input.pipe(output);
};
