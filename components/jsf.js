// 'use strict';

var
  _ = require('lodash'),
  inquirer = require('./jsf_inquirer'),
  transformers = require('./jsf_transformers');

function askQuestions(form, default_model) {
  var questions = getQuestions(form, default_model);
  return inquirer.prompt(questions);
}

function getArrayFields(schema, parent_field) {
  var array_form = [];
  var array_schema = _.cloneDeep(_.get(schema, ['properties', parent_field.key]));
  _.forEach(parent_field.items, function (item_field) {
    if (_.isString(item_field)) {
      item_field = {key: item_field};
    }
    item_field.key = item_field.key.replace(parent_field.key + '[].', ''); // Remove the array key prefix
    array_form.push(getNormalField(array_schema, item_field))
  });
  return array_form;
}

function getAsteriskFields(schema, schema_form) {
  var fields = _.cloneDeep(_.get(schema, ['properties']));
  _.forEach(fields, function (object, field) {
    field = { key: field };
    schema_form.push(getNormalField(schema, field));
  });
  return schema_form;
}

function getNormalField(schema, field) {
  var field_schema = _.cloneDeep(_.get(schema, ['properties', field.key]));
  if (_.isUndefined(field_schema))
    field_schema = _.cloneDeep(_.get(schema.items, ['properties', field.key])); //check for array

  field = _.merge(field_schema, _.get(field, ['schema', 'x-schema-form'], {}), field);

  if (field.type === 'array') {
    field = getArrayFields(schema, field); // Make the field an array of the objects properties
  }

  return field;
}

function getQuestions(array_fields, default_model) {
  var type, questions = [];
  _.forEach(array_fields, function (field) {
    "use strict";
    var question;

    if (_.isArray(field)) {
      question = getQuestions(field, default_model);
    } else {
      type = 'transform' + _.capitalize(field.type) + 'Field';
      if (!transformers[type]) {
        console.error(type);
        type = 'transformDefaultField';
      }
      question = transformers[type](field, _.get(default_model, field.key));
    }

    if (question != null) {
      return questions.push(question);
    }
  });
  return questions;
}

function jsfFields(schema, form, model) {
  var schema_form = [];

  _.forEach(form, function (field) {
    if (_.isString(field)) {
      field = {key: field};
    }

    if (field.key !== '*') { // normal fields
      schema_form.push(getNormalField(schema, field));
    } else if (field.key === '*') { // dynamic form indicated by asterisk to indicate all fields
      getAsteriskFields(schema, schema_form);
    }
  });
  return askQuestions(schema_form, model)
}

exports = module.exports.queries = jsfFields;