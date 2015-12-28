#!/usr/bin/env node

var flags = [];
var enclose = require('../../').exec;

//flags.push('--config', './config.js');
flags.push('--loglevel', 'info');
flags.push('./main.js');

enclose(flags);
