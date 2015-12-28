'use strict';

//var _ = require('lodash');
//var key = require('keymaster');
var Application = require('./modules/application');

var config = require('./config.js');

global.$app = new Application(config);
$app.on('started', function(context) {
  $('.processing-indicator').show();
});



