var Readable = require('stream').Readable;

var rs = new Readable;

function print(names) {

  names.forEach(function(name) {
    rs.push(
      name
      .toUpperCase()
      .split('')
      .map(function(char) {
        var a = 'BCDGJKPQTUVWYZ';
        var article = (a.indexOf(char) !== -1) ? 'a ' : 'an';
        return 'Gimme '+article+' '+char+'!\n';
      })
      .join('')
    );
  });
  rs.push(null);

  rs.pipe(process.stdout);
};

module.exports = print;
