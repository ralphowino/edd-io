var
  _ = require('lodash'),
  chalk = require('chalk'),
  input = require('./input'),
  inquirer = require('inquirer'),
  transformers = require('./jsf_transformers');

function jsfFields(schema, form, model) {
  var schema_form = [];

  _.forEach(form, function (field) {
    if (_.isString(field)) {
      field = {key: field};
    }

    if (field.key !== '*') {
      schema_form.push(helperNormalField(schema, field));
    } else {
      helperAsterixFields(schema, schema_form);
    }
  });
  return askQuestions(schema_form, model)
}

function helperNormalField(schema, field) {
  var field_schema = _.cloneDeep(_.get(schema, ['properties', field.key]));
  field = _.merge(field_schema, _.get(field, ['schema', 'x-schema-form'], {}), field);
  return field;
}

function helperAsterixFields(schema, schema_form) {
  var fields = _.cloneDeep(_.get(schema, ['properties']));
  _.forEach(fields, function (object, field) {
    field = { key: field };
    schema_form.push(helperNormalField(schema, field));
  });
  return schema_form;
}

function askQuestions(form, answers) {

  var type, questions = [];
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
    var question = transformers[type](field, _.get(answers, field.key));
    if (question != null) {
      questions.push(question);
    }
  });
  return inquirer.prompt(questions);
}

exports = module.exports.queries = jsfFields;