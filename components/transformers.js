var _ = require('lodash');

class ClassTransformers {

    transformArrayField(field) {
        // return input.choose(field.title + '. What do we do next', [
        // 	{	value: 'add',  name: 'Add'},
        // 	{	value: 'stop', name: 'Stop'}
        // ]).then(function ( selected ) {
        // 	if (selected == 'stop')
        // 		return answers;
        // 	var items = _.map(field.items, function (item) {
        // 		return item.replace(field.key.concat('[].'), '');
        // 	});
        // 	return input.fields(field.schema.items, items).then(function (answer) {
        // 		answers.push(answer);
        // 		return input.askArrayQuestion(field, answers)
        // 	})
        // });
    }

    transformBooleanField(field) {
        return {
            name: field.key,
            message: field.title ? field.title : field.key,
            type: 'confirm'
        }
    }

// transformCheckboxField(field) {
// 	return {
// 		name: field.key,
// 		message: field.title ? field.title : field.key,
// 		choices: choices,
// 		default: _default
// 	}
// }

    transformDefaultField(field, answer) {
        return {
            name: field.key,
            message: field.title ? field.title : field.key,
            type: 'input',
            default: _.isUndefined(answer) ? field.default : answer
        }
    }

    transformHelpField(field, answer) {
        console.log('no transform available for help text');
        return null;
    }

    transformIntegerField(field, answer) {
        return {
            name: field.key,
            message: field.title ? field.title : field.key,
            type: 'input',
            default: _.isUndefined(answer) ? field.default : answer //TODO add validate function
        }
    }

    transformNumberField(field, answer) {
        return {
            name: field.key,
            message: field.title ? field.title : field.key,
            type: 'input',
            default: _.isUndefined(answer) ? field.default : answer //TODO add validate function
        }
    }

    transformStringField(field, answer) {
        var question = transformers.transformDefaultField(field, answer);

        if (field.enum) {
            var choices = _.map(field.enum, function (item) {
                return {value: item, name: item};
            });
            question.type = 'rawlist';
            question.choices = choices;
        }
        return question;
    }

    transformSubmitField(field, answer) {
        console.log('no transform available for submit buttons');
        return null;
    }

    transformTextareaField(field, answer) {
        return {
            name: field.key,
            message: field.title ? field.title : field.key,
            type: 'input',
            default: _.isUndefined(answer) ? field.default : answer
        }
    }
}
export let Transformers = new ClassTransformers();