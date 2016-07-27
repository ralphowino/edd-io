// 'use strict';

var
	_ = require('lodash'),
	inquirer = require('inquirer'),
	q = require('q');

function loopQuestions(questions_array, index, answers) {
	if (!index) {
		index = 0;
	}

	if (!answers) {
		answers = {}
	}

	return inquirer.prompt(questions_array[index]).then(function (answer) {
		Object.assign(answers, answer);

		if (index === questions_array.length - 1) {
			return answers;
		} else {
			return loopQuestions(questions_array, index+1, answers)
		}
	});
}

function questionBuilder(questions_array) {
	return new Promise(function(resolve){
		return resolve(loopQuestions(questions_array));
	});
}

exports = module.exports.prompt = questionBuilder;