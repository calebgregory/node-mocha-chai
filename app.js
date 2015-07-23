#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var Readable = require('stream').Readable;
var Cheerleader = require('./lib/cheerleader');
var help = require('./lib/help');
var thanks = require(path.join(process.cwd(), '/lib/thanks'));

var names = argv._;
var my = new Cheerleader(names);
var rs = new Readable;

if(!names.length) {
  console.log(thanks);
}

if(argv.help) {
  help();
}

if(names.length) {
  rs.push(my.cheer(names));
  rs.push(null);

  rs.pipe(process.stdout);
}

