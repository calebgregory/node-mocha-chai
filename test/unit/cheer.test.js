var should = require('chai').should();
var assert = require('chai').assert;
var path = require('path');
var Cheerleader = require(path.join(process.cwd(), '/lib/cheerleader'));

describe('Cheer App', function() {

  describe('Cheerleader', function() {

    describe('constructor', function() {
      it('should return a phrase with the character as a capital', function() {
        var char = 'a';
        var cheerleader = new Cheerleader(char);
        assert.equal(cheerleader.name,char.toUpperCase());
      });

      it('should join names into one name if there are >1 names in the name', function() {
        var name = [ 'Grog', 'McGrog' ];
        var cheerleader = new Cheerleader(name);
        assert.equal(cheerleader.name,'GROGMCGROG');
      });
    });

    describe('#article()', function() {
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
    });

    describe('#phrase()', function() {
      it('should give a phrase "Gimme a _!" for a letter', function() {
        var char = 'b';
        var cheerleader = new Cheerleader(char);
        cheerleader.phrase(char).should.equal('Gimme a  B!\n');
      });
    });

    describe('#cheer()', function() {
      it('should give a phrase "Gimme a _!" for every letter in a name', function() {
        var name = "Grog";
        var output = "Gimme a  G!\nGimme an R!\nGimme an O!\nGimme a  G!\n";
        var cheerleader = new Cheerleader(name);
        cheerleader.cheer(name).should.equal(output);
      });

      it('should handle multiple names', function() {
        var name = ['Grog', 'McGrog'];
        var output = "Gimme a  G!\nGimme an R!\nGimme an O!\nGimme a  G!\nGimme an M!\nGimme a  C!\nGimme a  G!\nGimme an R!\nGimme an O!\nGimme a  G!\n";
        var cheerleader = new Cheerleader(name);
        cheerleader.cheer(name.join('').toUpperCase())
                          .should.equal(output);
      });
    });

  //it('should print help if help is called', function(done) {
  //  cp.execFile('./app.js', ['--help'], function(err,stdout) {
  //    var options = { encoding : 'utf8' };
  //    var msg = fs.readFileSync('./lib/help_message.txt',options);
  //    assert.equal(stdout,msg);
  //    done();
  //  });
  //});

  //it('should print help if no flags are passed', function(done) {
  //  cp.execFile('./app.js', function(err,stdout) {
  //    var options = { encoding : 'utf8' };
  //    var msg = fs.readFileSync('./lib/help_message.txt',options);
  //    assert.equal(stdout,msg);
  //    done();
  //  });
  //});

  });
});
