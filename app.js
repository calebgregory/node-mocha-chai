#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var Cheerleader = require('./lib/cheerleader');
var help = require('./lib/help');

var names = argv._;

var cheerleader = new Cheerleader();

if(!names.length) {
  help();
}

if(argv.help) {
  help();
}

if(names) {
  cheer.print(names);
}

