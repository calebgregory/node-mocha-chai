var path = require('path');
var should = require('chai').should();
var assert = require('chai').assert;
var Animal = require(path.join(process.cwd(), '/lib/Animal'));
var Cheerleader = require(path.join(process.cwd(), '/lib/cheerleader'));
var cp = require('child_process');
var fs = require('fs');

describe('Tests', function() {
  it('truthyness', function() {
    true.should.equal(true);
  });
});

describe('cheer', function() {

  it('should return a phrase with the character as a capital', function() {
    var char = 'a';
    var cheerleader = new Cheerleader(char);
    assert.equal(cheerleader.name,char.toUpperCase());
  });

  it('should have an "a" before a consonant', function(done) {
    'BCDGJKPQTUVWYZ'
      .split('')
      .forEach(function(char) {
        var cheerleader = new Cheerleader(char);
        cheerleader.article(char).should.equal('a ');;
      });
    done();
  });

  it('should give vowel sounds an article "an" before them', function(done) {
    'AEFHILMNORSX'
      .split('')
      .forEach(function(char) {
        var cheerleader = new Cheerleader(char);
        cheerleader.article(char).should.equal('an');
      });
    done();
  });

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

