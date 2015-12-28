/**
 * bin/toolbox-src/main.js
 *
 * @project vkcm
 * @binary toolbox
 * @summary Toolbox executable main program
 *
 */
'use strict';

const CONFIG = {
  version: 0.2,
  build:   107,
  debug:   true
};

let Shell = require('./shell');
let toolbox = new Shell(CONFIG);
