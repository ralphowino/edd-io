var _ = require('lodash'),
  input = require('./components/input'),
  Output = require('./components/output'),
  jsf = require('./components/jsf');

function init() {

}

module.exports = _.merge(input, jsf, {init: init});

module.exports.output = new Output;





