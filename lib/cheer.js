var Readable = require('stream').Readable;

var rs = new Readable;

function CheerGen() {
}

CheerGen.prototype.print = function(names) {

  var my = this;
  names.forEach(function(name) {
    rs.push(my.cheer(name));
  });
  rs.push(null);

  rs.pipe(process.stdout);
}

CheerGen.prototype.cheer = function(name) {
  var my = this;
  return name
    .split('')
    .map(function(char) {
      return my.phrase(char);
    })
    .join('');
};

CheerGen.prototype.phrase = function(char) {
  var my = this;
  char = char.toUpperCase();
  return 'Gimme '+my.article(char)+' '+char+'!\n';
};

CheerGen.prototype.article = function(char) {
  return 'BCDGJKPQTUVWYZ'
    .indexOf(char) > -1 ?
    'a ' :
    'an';
};

module.exports = CheerGen;
