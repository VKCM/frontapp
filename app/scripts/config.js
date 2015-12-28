/**
 * config.js
 *
 * @project vkcm
 * @module config
 * @summary Main configuration file
 *
 * @exports config
 */

process.env.NODE_ENV = 'development';

var basedir = '';
module.exports = {
  debug: true,
  autoload: {
    // Global node or bower libraries:
    /*
    Implement this UI tools & libs:
     http://www.bootstraptoggle.com
     http://sweefty.com/tinytip/
     http://troolee.github.io/gridstack.js/
     http://github.hubspot.com/select/docs/welcome/
     Validation:
       http://reactiveraven.github.io/jqBootstrapValidation/
       or http://lab.hasanaydogdu.com/validetta/demo/inline.html
     Uploads:
       http://www.dropzonejs.com
       http://mailru.github.io/FileAPI/examples/thumbnails.html
       http://fineuploader.com/demos.html
     Tooltips
       http://kushagragour.in/lab/hint/
       http://www.tippedjs.com
       http://github.hubspot.com/drop/docs/welcome/
     Photo slider
       http://www.frescojs.com
     Photo grid
       http://nitinhayaran.github.io/Justified.js/demo/index.html
     */
  }
};