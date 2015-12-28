/**
 * modules/application.js
 *
 * @project vkcm
 * @module debugger
 * @summary Debugging helpers module
 *
 * @exports debugger
 */


'use strict';
var Debug = require('debug');
var util = require('util');

var dbg = (function() {
  if(typeof $debugger !== 'undefined' && $debugger instanceof dbg) {
    return $debugger;
  } else {
    return {
      logger: function() {
        if(typeof $log !== 'undefined' && $log.__madeInDebugger === true) {
          return $log;
        } else {

          var self = {
            __madeInDebugger: true
          };
          if($config.debug === true) {
            self.info = Debug('info');
            self.info.color = 2;
            self.info.useColors = true;

            self.warn = Debug('warn');
            self.warn.color = 3;

            self.error = Debug('error');
            self.error.color = 4;

            self.debug = Debug('debug');
            self.debug.color = 1;

            self.__dir = Debug('dir');
            self.__dir.color = 5;
            self.dir = function(obj) {
              self.__dir(util.inspect(obj, {
                showHidden: true
              }));
            };
            Debug.enable('*');
          } else {
            // @todo: queue errors to issue tracker
            self = {
              info: function() {},
              warn: function() {},
              error: function() {},
              debug: function() {},
              dir: function() {},
            };
          }

          return self;
        }
      },

      handleError: function(e) {

      }
    }
  };
})();

module.exports = dbg;