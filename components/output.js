'use strict';
var
  chalk = require('chalk'),
  Spinner = require('cli-spinner').Spinner,
  _ = require('lodash');

class Output {
  line() {
    _.each(arguments, (message)=> {
      console.log(message);
    });
  };

  info() {
    _.each(arguments, (message)=> {
      console.info(chalk.cyan(message));
    });
  };

  success() {
    _.each(arguments, (message)=> {
      console.info(chalk.green(message));
    });
  };

  error() {
    _.each(arguments, (message)=> {
      console.error(chalk.white.bgRed(message));
    });
  };

  warning() {
    _.each(arguments, (message)=> {
      console.warn(chalk.yellow(message));
    });
  };

  spinner (message){
    let spinner = new Spinner(message+'...%s');
    spinner.setSpinnerString('|/-\\');
    return spinner;
  }
}


module.exports = Output;
