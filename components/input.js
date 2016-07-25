var
  inquirer = require('inquirer'),
  _ = require('lodash');
module.exports.ask = function (message, _default) {
  return inquirer.prompt([{
    name: 'response',
    message: message,
    type: 'input',
    default: _default
  }]).then(function (answers) {
    return answers.response;
  });
};

module.exports.secret = function (message, _default) {
  console.log(message);
  return inquirer.prompt([{
    name: 'response',
    message: message,
    type: 'password',
    default: _default
  }]).then(function (answers) {
    return answers.response;
  });
};

module.exports.confirm = function (message, _default) {
  return inquirer.prompt([{
    name: 'response',
    message: message,
    type: 'confirm',
    default: _default
  }]).then(function (answers) {
    return answers.response;
  });
};

module.exports.choose = function (message, choices, _default) {
  return inquirer.prompt([{
    name: 'response',
    message: message,
    type: 'list',
    choices: choices,
    default: _default
  }]).then(function (answers) {
    return answers.response;
  });
};

module.exports.choice = function (question, choices, selected) {
  "use strict";
  return inquirer.prompt([{
    name: 'response',
    message: question,
    type: 'list',
    choices: choices,
    default: selected
  }]).then(function (answers) {
    return answers.response;
  });
};

exports = module.exports;
