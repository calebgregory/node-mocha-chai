var should = require('chai').should();
var path = require('path');
var Animal = require(path.join(process.cwd(), '/lib/Animal'));

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
