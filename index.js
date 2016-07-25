var _ = require('lodash'),
  input = require('./components/input'),
  output = require('./components/output'),
  asf = require('./components/asf');

function init(){

}

exports = module.exports = _.merge(input, output, asf, {init: init});





