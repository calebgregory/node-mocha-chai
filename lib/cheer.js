var Readable = require('stream').Readable;

module.exports = function(names) {
  var rs = new Readable;

  rs._read = function() {
    names.forEach(function(name,i) {
      name
        .toUpperCase()
        .split('')
        .forEach(function(char,i) {
          var a = "BCDGJKPQTUVWYZ";
          var article = (a.indexOf(char) !== -1) ? 'a ' : 'an';
          rs.push('Gimme '+article+' '+char+'!\n');
        });
    });
    rs.push(null);
  };

  rs.pipe(process.stdout);
};
