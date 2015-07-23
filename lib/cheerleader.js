var Readable = require('stream').Readable;

var rs = new Readable;

function Cheerleader(name) {
  var their = this;
  their.name = name.toUpperCase();
}

Cheerleader.prototype.article = function(char) {
  return 'BCDGJKPQTUVWYZ'
    .indexOf(char) > -1 ?
    'a ' :
    'an' ;
};

Cheerleader.prototype.phrase = function(char) {
  var my = this;
  char = char.toUpperCase();
  return 'Gimme '+my.article(char)+' '+char+'!\n';
};

Cheerleader.prototype.cheer = function(name) {
  var my = this;
  return name
    .split('')
    .map(function(char) {
      return my.phrase(char);
    })
    .join('');
};

Cheerleader.prototype.print = function(names) {
  var my = this;
  names.forEach(function(name) {
    rs.push(my.cheer(name));
  });
  rs.push(null);

  rs.pipe(process.stdout);
};

module.exports = Cheerleader;
