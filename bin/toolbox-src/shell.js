'use strict';

class Shell {
  constructor(config) {
    if (typeof config !== 'object') {
      console.log('ERROR: No configuration given to shell.');
      process.exit(1);
    }

    this.config = config;
    this.out = require('debug');
    this.out.enable('info, job, error');

    this.consoleLog = this.out('info');
    this.consoleLog.color = 4;
    this.consoleLog.humanize = function(text) {
      return text;
    }
    console.log = this.consoleLog;

    this.consoleJob = this.out('job');
    this.consoleJob.color = 2;
    console.job = this.consoleJob;

    this.error = function(text) {
      var errorsOutput = this.out('error');
      errorsOutput(text);
      process.exit(1);
    };
    this.error.color = 1;
    console.error = this.error;

    console.debug = this.out('debug');
    console.debug.color = 3;

    if(this.config.debug === true) {
      this.out.enable('debug');
    }

    console.log('siska');
    console.log(`VKCM Toolbox`, `Build ${this.config.build}`);
    console.log(``)

    process.on('SIGINT', function () {
      this.output('Got a SIGINT. Goodbye!');
      process.exit(0);
    });
  }

  listModes() {
    this.print(`List of possible working modes:`);
  }
};

module.exports = Shell;
