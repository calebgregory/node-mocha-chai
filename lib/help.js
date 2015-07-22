var fs = require('fs');

function print() {
  var options = { encoding : 'utf-8' };
  var msg = fs.readFileSync('./lib/help_message.txt', options);
  process.stdout.write(msg);
};

module.exports = function() {
  print();
  process.exit(1);
};
