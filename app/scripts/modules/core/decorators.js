/**
 * modules/decorators.js
 *
 * @project vkcm
 * @module decorators
 * @summary Application common decorators
 *
 * @exports decorators
 */

'use strict';

function checkPermissionDecorator(f) {
  return function() {
    if (isAdmin()) {
      return f.apply(this, arguments);
    }
    alert( 'Недостаточно прав' );
  }
}

global.isDefined = function(obj) {
  return typeof obj !== 'undefined' ? true : false;
};

global.isDefined = function(obj) {
  return typeof obj !== 'undefined' ? true : false;
};


module.exports = function() {
  return true;
};