/* @todo: add header */

/**
 * Dependency loading & service location module
 * @param locals Value of app.locals
 * no @return
 */

var modulesList = {
  decorators: './decorators'
};

var locator = (function() {

  if (typeof $locator !== 'undefined' && $locator instanceof locator) return $locator;
  else return {

    /**
     * Registers module globally
     * @param name
     * @param mod
     */
      register: function(name, mod) {
      'use strict';
      var registeredName = '$' + name;
      if (global[registeredName]
          && global[registeredName].__locatorInstance) {
        if (global[registeredName].__locatorInstance === name) {
          $log.info('locator: ' + name + ' already registered, skipping');
          return true;
        } else {
          $log.warn('locator: ' + name + ' exists but loaded not through locator, trying to' +
              ' reload...');
          delete global[registeredName];
        }
      }


      mod.__locatorInstance = name;
      global[registeredName] = mod;


      $log.info('locator: ' + registeredName + ' registered sucsessfully.');

    },

    /**
     * Load file and register it
     * @todo  change registration pipe to self.register();
     * @param modulesList {Object} list of modulesList
     * no @return
     */
    loadModule: function(modulesList) {
      if (typeof modulesList === 'object') {
        for (var current in modulesList) {
          $log.info('locator: loading ' + current + ' module');
          currentModule = modulesList[current];
          var registeredName = '$' + current;
          if (global[registeredName]
              && global[registeredName].__locatorInstance) {
            if (global[registeredName].__locatorInstance === current) {
              $log.info('locator: ' + current + ' already loaded, skipping');
              continue;
            } else {
              $log.warn('locator: ' + current + ' exists but loaded not through locator.loadModule(), trying to' +
                  ' reload...');
            }
          }
          if (typeof currentModule === 'string') {
            $log.warn('VAR=' + currentModule + '=');
            var bufferedModule = require(currentModule);
          } else if (typeof currentModule === 'function') {
            var bufferedModule = currentModule(self);
            $log.warn('2');
          } else {
            $log.handleException(new Error('lolol'));
          }

          if (typeof bufferedModule === 'function' || 'object') {
            console.log(bufferedModule);
            if (bufferedModule.prototype.autoload &&
                typeof bufferedModule.prototype.autoload == 'function') {
              bufferedModule.prototype.autoload.call(bufferedModule, self);
            }
          }

          bufferedModule.__locatorInstance = current;
          global[registeredName] = bufferedModule;


          $log.info('locator: ' + registeredName + ' loaded');
        }
      }
    },

    runInSandbox: function(scripts, callback) {
      if(!window.loadjs) {
        (function (win, doc) {
          var head                = doc.head,
              devnull             = function() {},
              bundleIdCache       = {},
              bundleResultCache   = {},
              bundleCallbackQueue = {};


          /**
           * Subscribe to bundle load event.
           * @param {string[]} bundleIds - Bundle ids
           * @param {Function} callbackFn - The callback function
           */
          function subscribe(bundleIds, callbackFn) {
            // listify
            bundleIds = bundleIds.push ? bundleIds : [bundleIds];

            var depsNotFound = [],
                i            = bundleIds.length,
                numWaiting   = i,
                fn, bundleId, r, q;

            // define callback function
            fn = function(bundleId, pathsNotFound) {
              if (pathsNotFound.length) depsNotFound.push(bundleId);

              numWaiting -= 1;
              if (numWaiting === 0) callbackFn(depsNotFound);
            };

            // register callback
            while (i--) {
              bundleId = bundleIds[i];

              // execute callback if in result cache
              r = bundleResultCache[bundleId];
              if (r) {
                fn(bundleId, r);
                continue;
              }

              // add to callback queue
              q = bundleCallbackQueue[bundleId] = bundleCallbackQueue[bundleId] || [];
              q.push(fn);
            }
          }


          /**
           * Publish bundle load event.
           * @param {string} bundleId - Bundle id
           * @param {string[]} pathsNotFound - List of files not found
           */
          function publish(bundleId, pathsNotFound) {
            // exit if id isn't defined
            if (!bundleId) return;

            var q = bundleCallbackQueue[bundleId];

            // cache result
            bundleResultCache[bundleId] = pathsNotFound;

            // exit if queue is empty
            if (!q) return;

            // empty callback queue
            while (q.length) {
              q[0](bundleId, pathsNotFound);
              q.splice(0, 1);
            }
          }


          /**
           * Load individual JavaScript file.
           * @param {string} path - The file path
           * @param {Function} callbackFn - The callback function
           */
          function loadScript (path, callbackFn) {
            var s = doc.createElement('script');
            s.src = path;

            s.onload = s.onerror = function(ev) {
              // remove script
              s.parentNode.removeChild(s);

              // de-reference script
              s = null;

              // execute callback
              callbackFn(path, ev.type);
            };

            // add to document
            head.appendChild(s);
          }


          /**
           * Load multiple JavaScript files.
           * @param {string[]} paths - The file paths
           * @param {Function} callbackFn - The callback function
           */
          function loadScripts(paths, callbackFn) {
            // listify paths
            paths = paths.push ? paths : [paths];

            var i = paths.length, numWaiting = i, pathsNotFound = [], fn;

            // define callback function
            fn = function(path, result) {
              if (result === 'error') pathsNotFound.push(path);

              numWaiting -= 1;
              if (numWaiting === 0) callbackFn(pathsNotFound);
            };

            // load scripts
            while (i--) loadScript(paths[i], fn);
          }


          /**
           * Initiate script load and register bundle.
           * @param {(string|string[])} paths - The file paths
           * @param {(string|Function)} [arg1] - The bundleId or success callback
           * @param {Function} [arg2] - The success or fail callback
           * @param {Function} [arg3] - The fail callback
           */
          function loadjs (paths, arg1, arg2, arg3) {
            var bundleId, successFn, failFn;

            // bundleId
            if (arg1 && !arg1.call) bundleId = arg1;

            // successFn, failFn
            if (bundleId) successFn = arg2;
            else successFn = arg1;

            // failFn
            if (bundleId) failFn = arg3;
            else failFn = arg2;

            // throw error if bundle is already defined
            if (bundleId) {
              if (bundleId in bundleIdCache) {
                $log.handleError('LoadJS: Bundle already defined');
              } else {
                bundleIdCache[bundleId] = true;
              }
            }

            // load scripts
            win.setTimeout(function () {
              loadScripts(paths, function (pathsNotFound) {
                if (pathsNotFound.length) (failFn || devnull)(pathsNotFound);
                else (successFn || devnull)();

                // publish bundle load event
                publish(bundleId, pathsNotFound);
              });
            }, 0);  // fires after window 'load' event
          }


          /**
           * Execute callbacks when dependencies have been satisfied.
           * @param {(string|string[])} deps - List of bundle ids
           * @param {Function} [successFn] - Success callback
           * @param {Function} [failFn] - Fail callback
           */
          loadjs.ready = function(deps, successFn, failFn) {
            // subscribe to bundle load event
            subscribe(deps, function(depsNotFound) {
              // execute callbacks
              if (depsNotFound.length) (failFn || devnull)(depsNotFound);
              else (successFn || devnull)();
            });

            return loadjs;
          };


          /**
           * Manually satisfy bundle dependencies.
           * @param {string} bundleId - The bundle id
           */
          loadjs.done = function done(bundleId) {
            publish(bundleId, []);
          };


          // export
          win.loadjs = loadjs;
        })(window, document);
      }

      window.loadjs(scripts, callback);

    },

    /**
     * Preload a collection of images (license : GPL v2)
     *
     * @param {(Object|string[])} srcCollection - A collection of images
     * @param {function((Object|Object[]))=} callbackAll - A function callback that is called after all the loading
     * @param {boolean} [sequential=false] - A boolean defining wheter to force the sequential loading. Default : false.
     *
     */
    cacheImages: function(srcCollection, callbackAll, sequential) {

      sequential = typeof sequential !== 'undefined' ? sequential : false;

      var imgCollection = srcCollection instanceof Array ? [] : {};
      var srcIndexArray = [];
      for (var key in srcCollection) {
        srcIndexArray.push(key);
      }

      function onEvent(index) {
        return function () {
          load(imgCollection[srcIndexArray[index]], (function () {
            if (sequential && index < srcIndexArray.length - 1) {
              return function () {
                var newIndex = srcIndexArray[index + 1];
                imgCollection[newIndex].src = srcCollection[newIndex];
              };
            } else {
              return null;
            }
          })());
        };
      }

      function load(image, callback) {
        if (++nbLoaded >= nbToLoad && 'function' === typeof callbackAll) {
          callbackAll(imgCollection);
        }
      }

      if (srcIndexArray.length) {
        var nbLoaded = 0,
            nbToLoad = 0;
        for (var i = 0; i < srcIndexArray.length; i++) {

          nbToLoad++;
          imgCollection[srcIndexArray[i]] = new Image();
          imgCollection[srcIndexArray[i]].onload = imgCollection[srcIndexArray[i]].onerror = imgCollection[srcIndexArray[i]].onabort = onEvent(i);

          if (!sequential) {
            imgCollection[srcIndexArray[i]].src = srcCollection[srcIndexArray[i]].src;
            imgCollection[srcIndexArray[i]].props = srcCollection[srcIndexArray[i]].props;
          }
        }
        if (sequential) {
          imgCollection[srcIndexArray[0]].src = srcCollection[srcIndexArray[0]];
          imgCollection[srcIndexArray[i]].props = srcCollection[srcIndexArray[i]].props;
        }
      }
    }
  };
})();

module.exports = locator;
