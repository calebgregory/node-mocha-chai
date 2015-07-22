#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var cheer = require('./lib/cheer');
var help = require('./lib/help');

var names = argv._;

if(!names.length) {
  help();
}

if(argv.help) {
  help();
}

if(names) {
  cheer(names);
}

