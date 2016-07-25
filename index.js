var _ = require('lodash'),
  input = require('./components/input'),
  output = require('./components/output'),
  jsf = require('./components/jsf');

function init(){

}

exports = module.exports = _.merge(input, output, jsf, {init: init});





