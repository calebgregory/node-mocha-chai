var path = require('path');
var should = require('chai').should();
var assert = require('chai').assert;
var Animal = require(path.join(process.cwd(), '/lib/Animal'));
var Cheer = require(path.join(process.cwd(), '/lib/cheer'));
var cp = require('child_process');
var fs = require('fs');

describe('Tests', function() {
  it('truthyness', function() {
    true.should.equal(true);
  });
});

describe('cheer', function() {

  var cheer = new Cheer();

  it('should print help if help is called', function(done) {
    cp.execFile('./app.js', ['--help'], function(err,stdout) {
      var options = { encoding : 'utf8' };
      var msg = fs.readFileSync('./lib/help_message.txt',options);
      assert.equal(stdout,msg);
      done();
    });
  });

  it('should print help if no flags are passed', function(done) {
    cp.execFile('./app.js', function(err,stdout) {
      var options = { encoding : 'utf8' };
      var msg = fs.readFileSync('./lib/help_message.txt',options);
      assert.equal(stdout,msg);
      done();
    });
  });

  it('should print a cheer if an name is put in', function(done) {
    cp.execFile('./app.js', ['Abc'], function(err,stdout) {
      var output = 'Gimme an A!\nGimme a  B!\nGimme a  C!\n';
      assert.equal(stdout,output);
      done();
    });
  });

  it('should print lowercase in uppercase', function(done) {
    cp.execFile('./app.js', ['a'], function(err,stdout) {
      var output = 'Gimme an A!\n';
      assert.equal(stdout,output);
      done();
    });
  });

  it('should have an "a" before a consonant', function(done) {
    cp.execFile('./app.js', ['d'], function(err,stdout) {
      var output = 'Gimme a  D!';
      assert.equal(stdout,output);
      done();
    });
  });

});

describe('Animal', function() {

  describe('constructor', function() {

    var animal = new Animal();

    it('should return an animal object', function() {
      animal.should.be.an('object');
      animal.should.be.an.instanceOf(Animal);
    });

    it('should be alive', function() {
      animal.isAlive.should.be.true;
    });

    it('should accept a type', function() {
      var cat = new Animal('cat');
      var dog = new Animal('dog');

      cat.type.should.equal('cat');
      dog.type.should.equal('dog');
    });

    it('should have 100% health', function() {
      animal.health.should.equal(1);
    });

  });

  describe('#updateHealthStats()', function() {
    it('should change the health', function(done) {
      var animal = new Animal();

      animal.updateHealthStats(function() {
        animal.health.should.be.below(1)
          .and.above(0);
        done();
      });
    });
  });

  describe('#beCute()', function() {

    var animal = new Animal();

    it('should be a prototype method', function() {
      animal.should.respondTo('beCute');
      animal.should.not.have.ownProperty('isCute');
    });

    it('should make the animal cute', function() {
      should.not.exist(animal.isCute);
      animal.beCute();
      animal.isCute.should.be.true;
    });
  });

});

describe('Array', function() {

  describe('#map()', function() {
    it('should have equal length', function() {
      var array = [1,2,3,4,5];

      var length = array.map(function(value) {
        return false;
      }).length;

      length.should.equal(array.length);
    });

    it('should not mutate the original array', function() {
      var array = [1,2,3,4,5];

      array.map(function(value) {
        return false;
      });

      array.should.eql([1,2,3,4,5]);
    });

    it('should return an array with the return value of the inner fn', function() {
      var array = [1,2,3,4,5];

      var output = array.map(function(value) {
        return value * value;
      });

      output.should.eql([1,4,9,16,25]);
    });
  });

  describe('#filter()', function() {
    it('should return an array of items that returns truthy in the inner fn', function() {
      var array = [1,2,3,4,5];

      var output = array.filter(function(item) {
        return item % 2;
      });

      output.should.eql([1,3,5]);
    });
  });

});

