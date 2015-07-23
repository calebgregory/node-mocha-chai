function Cheerleader(name) {
  var their = this;
  name = name.constructor === Array ? name.join('') : name;
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

module.exports = Cheerleader;
