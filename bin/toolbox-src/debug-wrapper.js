'use strict';

var debug = require('debug');
var wrapper = {
  instance: debug,
  colors: {
    red: 1,
    orange: 2,
    yellow: 3,
    green: 4,
    blue: 5,
    some: 6
  },
  defaults: {
    color: 2,
    formatter: '%s',
    enabled: true
  },
  enabled: [],
  disabled: [],

  logger: function(namespace, params) {
    if (typeof namespace === 'string') {
      if (typeof params === 'string') {
        params = {
          color: params
        };
      } else if (typeof params !== 'object' && typeof params !== 'string') {
        var params = {};
      }

      var config = {};
      for (var curr in wrapper.defaults) {
        config[curr] = typeof params[curr] !== 'undefined' ? params[curr] : wrapper.defaults[curr];
      }

      var dbg = wrapper.instance(namespace);
      console.dir(wrapper.instance);
      dbg.color = config.color;

    } else {
      throw new ReferenceError('failed to create logger: check constructor required arguments');
    }
  }
};


var meme = new wrapper.logger('me:me');