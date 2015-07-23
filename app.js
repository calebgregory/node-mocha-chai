#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var Readable = require('stream').Readable;
var Cheerleader = require('./lib/cheerleader');
var help = require('./lib/help');

var names = argv._;
var my = new Cheerleader(names);
var rs = new Readable;

if(!names.length) {
  help();
}

if(argv.help) {
  help();
}

if(names) {
  rs.push(my.cheer(name));
  rs.push(null);

  rs.pipe(process.stdout);
}

