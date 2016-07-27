// 'use strict';

var
	_ = require('lodash'),
	inquirer = require('inquirer'),
	q = require('q');

function loopQuestions(questions_array) {
	var promises =[];

	_.forEach(questions_array,function (question) {
		promises.push(inquirer.prompt(question));
	});

	return q.all(promises).then(function (answer) {
		return answer;
	});
}

function questionBuilder(questions_array) {
	return new Promise(function(resolve){
		return resolve(loopQuestions(questions_array));
	});
}

exports = module.exports.prompt = questionBuilder;