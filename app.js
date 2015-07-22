#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var Cheer = require('./lib/cheer');
var help = require('./lib/help');

var names = argv._;

var cheer = new Cheer();

if(!names.length) {
  help();
}

if(argv.help) {
  help();
}

if(names) {
  cheer.print(names);
}

