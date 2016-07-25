var
	_ = require('lodash'),
	chalk = require('chalk'),
	input = require('./input'), //TODO:: input should be dependent of tranformers and not the other way round
	inquirer = require('inquirer'),
	transformers = {};

transformers.transformArrayField = function (field, answers) {
	if (!answers) answers = [];
	return input.choose(field.title + '. What do we do next', [{value: 'add', name: 'Add'}, {
		value: 'skip',
		name: 'Skip'
	}]).then(function (selected) {
		if (selected == 'skip')
			return answers;
		var items = _.map(field.items, function (item) {
			return item.replace(field.key.concat('[].'), '');
		});
		return input.fields(field.schema.items, items).then(function (answer) {
			answers.push(answer);
			return input.askArrayQuestion(field, answers)
		})
	});
};

transformers.transformBooleanField = function (field) {
	return {
		name: field.key,
		message: field.title ? field.title : field.key,
		type: 'confirm'
	}
};

transformers.transformDefaultField = function (field, answer) {
	return {
		name: field.key,
		message: field.title ? field.title : field.key,
		type: 'input',
		default: _.isUndefined(answer) ? field.default : answer
	}
};

transformers.transformIntegerField = function (field, answer) {
	return {
		name: field.key,
		message: field.title ? field.title : field.key,
		type: 'input',
		default: _.isUndefined(answer) ? field.default : answer //TODO add validate function
	}
};

transformers.transformNumberField = function (field, answer) {
	return {
		name: field.key,
		message: field.title ? field.title : field.key,
		type: 'input',
		default: _.isUndefined(answer) ? field.default : answer //TODO add validate function
	}
};

transformers.transformStringField = function (field, answer) {
	var question = transformers.transformDefaultField(field, answer);

	if (field.enum) {
		var choices = _.map(field.enum, function (item) {
			return {value: item, name: item};
		});
		question.type = 'rawlist';
		question.choices = choices;
	}
	return question;
};

transformers.transformSubmitField = function (field, answer) {
	console.log('no transform available for submit buttons');
	return null;
};

transformers.transformTextareaField = function (field, answer) {
	return {
		name: field.key,
		message: field.title ? field.title : field.key,
		type: 'editor',
		default: _.isUndefined(answer) ? field.default : answer
	}
};

exports = module.exports =  transformers;