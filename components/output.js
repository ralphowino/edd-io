var
  chalk = require('chalk'),
  _ = require('lodash');

module.exports.line = function () {
  _.each(arguments, function (message) {
    console.log(message);
  });
}


module.exports.info = function () {
  _.each(arguments, function (message) {
    console.info(chalk.cyan(message));
  });
};

module.exports.success = function () {
  _.each(arguments, function (message) {
    console.info(chalk.green(message));
  });
};

module.exports.error = function () {
  _.each(arguments, function (message) {
    console.error(chalk.white.bgRed(message));
  });
};

module.exports.warning = function () {
  _.each(arguments, function (message) {
    console.warn(chalk.yellow(message));
  });
};
