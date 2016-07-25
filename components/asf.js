var input = require('./input'),
  chalk = require('chalk'),
  inquirer = require('inquirer'),
  _ = require('lodash'),
  transformers = {};

transformers.transformDefaultField = function (field, answer) {
  return {
    name: field.key,
    message: field.title ? field.title : field.key,
    type: 'input',
    default: _.isUndefined(answer) ? field.default : answer
  }
}

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

transformers.transformBooleanField = function (field) {
  return input.confirm(field.title, field.default);
};

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


function jsfFields(schema, form, model) {
  form = _.map(form, function (field) {
    if (_.isString(field)) {
      field = {key: field};
    }
    field.schema = _.cloneDeep(_.get(schema, ['properties', field.key]));
    field = _.merge(field.schema, _.get(field, ['schema', 'x-schema-form'], {}), field);
    return field;
  });
  return askQuestions(form, model)
}

function askQuestions(form, answers) {

  var field, type, questions = [];
  if (!answers) {
    answers = {}
  }
  _.each(form, function (field) {
    "use strict";
    type = 'transform' + _.capitalize(field.type) + 'Field';
    if (!transformers[type]) {
      console.error(type);
      type = 'transformDefaultField';
    }
    questions.push(transformers[type](field, _.get(answers, field.key)));
  });
  return inquirer.prompt(questions);
}

exports = module.exports.queries = jsfFields;