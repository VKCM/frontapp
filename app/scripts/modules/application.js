/**
 * modules/application.js
 *
 * @project vkcm
 * @module application
 * @summary General application setup
 *
 * @exports Application
 */

'use strict';

var path = require('path');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var locals = {};

/**
 * Application constructor
 * @param conf {Object|String} configuration object or filename
 * @constructor
 */

var Application = function(conf) {
  if (typeof global.$app !== 'undefined' && global.$app instanceof Application) {
    return global.$app;
  }

  var self = this;

  locals.basedir = path.normalize(__dirname + '/../');
  if (typeof conf === 'string') {
    locals.config = require(locals.basedir + conf);
  } else if (typeof conf === 'object') {
    locals.config = conf;
  };

  this.loader = {
    start: function() {

    }
  };
  global.$config = locals.config;
  global.$debugger = require('./core/debugger');
  global.$log = global.$debugger.logger();

  $log.info('Running application...');
  global.$locator  = require('./core/locator');
  $locator.register('notificationService', require('./core/src/services/notification'));


  if (self instanceof EventEmitter) {
    document.addEventListener('DOMContentLoaded', function() {
      $log.info('DOM Loaded. Initializing front-end state');
      $app.emit('domReady');
    });
  }

  EventEmitter.call(this);
};

util.inherits(Application, EventEmitter);

module.exports = Application;
