var chai = require('chai')
  , chaiSpies = require('chai-spies')
  , should = chai.should();

chai.use(chaiSpies);

var fsagent = require('..')
  , fs = require('fs')
  , join = require('path').join;

describe('fsagent', function () {

  before(function (done) {
    fs.mkdir(join(__dirname, 'fixtures'), function () {
      done();
    });
  });

  after(function (done) {
    fsagent.rmdir(join(__dirname, 'fixtures'), function (err) {
      done();
    });
  });

  it('can create a nested group of folders', function (done) {
    var dir = join(__dirname, 'fixtures', 'a', 'b');
    fsagent.existsSync(dir).should.be.false;
    fsagent.mkdir(dir, function (err) {
      should.not.exist(err);
      fsagent.existsSync(dir).should.be.true;
      done();
    });
  });

  it('can delete a nested group of folders', function (done) {
    var dir = join(__dirname, 'fixtures', 'a')
      , file = join(dir, 'b', 'c.txt');
    fsagent.existsSync(join(dir, 'b')).should.be.true;
    fs.writeFileSync(file, 'hello universe', 'utf8');
    fsagent.existsSync(file).should.be.true;
    fsagent.rmdir(dir, function (err) {
      should.not.exist(err);
      fsagent.existsSync(file).should.be.false;
      fsagent.existsSync(dir).should.be.false;
      fsagent.existsSync(join(__dirname, 'fixtures')).should.be.true;
      done();
    });
  });

  it('can watch a directory for changes', function (done) {
    var dir = join(__dirname, 'fixtures')
      , watch = fsagent.watch(dir)
      , file = join(dir, 'a', 'b', 'c.txt');

    var watchSpy = chai.spy(function (f) {
      should.exist(f);
      fsagent.existsSync(f).should.be.true;
    });

    var createSpy = chai.spy(function (f, s) {
      should.exist(f);
      should.exist(s);
      if (f === file)
        fs.writeFile(file, 'hello universe', 'utf8');
    });

    var changeSpy = chai.spy(function (f, s) {
      should.exist(f);
      should.exist(s);
      if (f === file)
        fs.unlink(file);
    });

    var deleteSpy = chai.spy(function (f) {
      should.exist(f);
      fsagent.existsSync(f).should.be.false;
    });

    var unwatchSpy = chai.spy(function (f) {
      if (f === file) cleanUp();
    });

    watch.on('watch', watchSpy);
    watch.on('create', createSpy);
    watch.on('change', changeSpy);
    watch.on('delete', deleteSpy);
    watch.on('unwatch', unwatchSpy);

    fsagent.mkdir(join(dir, 'a', 'b'), function (err) {
      should.not.exist(err);
      fs.writeFileSync(file, 'hello world', 'utf8');
    });

    function cleanUp () {
      watchSpy.should.have.been.called.above(1);
      createSpy.should.have.been.called.above(1);
      changeSpy.should.have.been.called.once;
      deleteSpy.should.have.been.called.once;
      unwatchSpy.should.have.been.called.once;
      watch.clear();
      done();
    }
  });

});
