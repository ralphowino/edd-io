var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inquirer = require('inquirer');

var ClassInquirer = function () {
    function ClassInquirer() {
        classCallCheck(this, ClassInquirer);
    }

    createClass(ClassInquirer, [{
        key: 'loopQuestions',
        value: function loopQuestions(questions_array, index, answers) {
            if (!index) {
                index = 0;
            }

            if (!answers) {
                answers = {};
            }

            return inquirer.prompt(questions_array[index]).then(function (answer) {
                Object.assign(answers, answer);

                if (index === questions_array.length - 1) {
                    return answers;
                } else {
                    return this.loopQuestions(questions_array, index + 1, answers);
                }
            });
        }

        /**
         * Modified version of inquirer prompt function
         * @param questions_array
         * @returns {Promise<T>|Promise}
         */

    }, {
        key: 'prompt',
        value: function prompt(questions_array) {
            return new Promise(function (resolve) {
                return resolve(this.loopQuestions(questions_array));
            });
        }
    }]);
    return ClassInquirer;
}();

var Inquirer = new ClassInquirer();

var _$1 = require('lodash');

var ClassTransformers = function () {
    function ClassTransformers() {
        classCallCheck(this, ClassTransformers);
    }

    createClass(ClassTransformers, [{
        key: 'transformArrayField',
        value: function transformArrayField(field) {
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
    }, {
        key: 'transformBooleanField',
        value: function transformBooleanField(field) {
            return {
                name: field.key,
                message: field.title ? field.title : field.key,
                type: 'confirm'
            };
        }

        // transformCheckboxField(field) {
        // 	return {
        // 		name: field.key,
        // 		message: field.title ? field.title : field.key,
        // 		choices: choices,
        // 		default: _default
        // 	}
        // }

    }, {
        key: 'transformDefaultField',
        value: function transformDefaultField(field, answer) {
            return {
                name: field.key,
                message: field.title ? field.title : field.key,
                type: 'input',
                default: _$1.isUndefined(answer) ? field.default : answer
            };
        }
    }, {
        key: 'transformHelpField',
        value: function transformHelpField(field, answer) {
            console.log('no transform available for help text');
            return null;
        }
    }, {
        key: 'transformIntegerField',
        value: function transformIntegerField(field, answer) {
            return {
                name: field.key,
                message: field.title ? field.title : field.key,
                type: 'input',
                default: _$1.isUndefined(answer) ? field.default : answer //TODO add validate function
            };
        }
    }, {
        key: 'transformNumberField',
        value: function transformNumberField(field, answer) {
            return {
                name: field.key,
                message: field.title ? field.title : field.key,
                type: 'input',
                default: _$1.isUndefined(answer) ? field.default : answer //TODO add validate function
            };
        }
    }, {
        key: 'transformStringField',
        value: function transformStringField(field, answer) {
            var question = transformers.transformDefaultField(field, answer);

            if (field.enum) {
                var choices = _$1.map(field.enum, function (item) {
                    return { value: item, name: item };
                });
                question.type = 'rawlist';
                question.choices = choices;
            }
            return question;
        }
    }, {
        key: 'transformSubmitField',
        value: function transformSubmitField(field, answer) {
            console.log('no transform available for submit buttons');
            return null;
        }
    }, {
        key: 'transformTextareaField',
        value: function transformTextareaField(field, answer) {
            return {
                name: field.key,
                message: field.title ? field.title : field.key,
                type: 'input',
                default: _$1.isUndefined(answer) ? field.default : answer
            };
        }
    }]);
    return ClassTransformers;
}();

var Transformers = new ClassTransformers();

var _ = require('lodash');

var ClassFields = function () {
    function ClassFields() {
        classCallCheck(this, ClassFields);
    }

    createClass(ClassFields, [{
        key: 'askQuestions',
        value: function askQuestions(form, default_model) {
            var questions = this.getQuestions(form, default_model);
            return Inquirer.prompt(questions);
        }
    }, {
        key: 'getArrayFields',
        value: function getArrayFields(schema, parent_field) {
            var array_form = [];
            var array_schema = _.cloneDeep(_.get(schema, ['properties', parent_field.key]));
            _.forEach(parent_field.items, function (item_field) {
                if (_.isString(item_field)) {
                    item_field = { key: item_field };
                }
                item_field.key = item_field.key.replace(parent_field.key + '[].', ''); // Remove the array key prefix
                array_form.push(this.getNormalField(array_schema, item_field));
            });
            return array_form;
        }
    }, {
        key: 'getAsteriskFields',
        value: function getAsteriskFields(schema, schema_form) {
            var fields = _.cloneDeep(_.get(schema, ['properties']));
            _.forEach(fields, function (object, field) {
                field = { key: field };
                schema_form.push(this.getNormalField(schema, field));
            });
            return schema_form;
        }
    }, {
        key: 'getNormalField',
        value: function getNormalField(schema, field) {
            var field_schema = _.cloneDeep(_.get(schema, ['properties', field.key]));
            if (_.isUndefined(field_schema)) field_schema = _.cloneDeep(_.get(schema.items, ['properties', field.key])); //check for array

            field = _.merge(field_schema, _.get(field, ['schema', 'x-schema-form'], {}), field);

            if (field.type === 'array') {
                field = this.getArrayFields(schema, field); // Make the field an array of the objects properties
            }

            return field;
        }
    }, {
        key: 'getQuestions',
        value: function getQuestions(array_fields, default_model) {
            var type,
                questions = [];
            _.forEach(array_fields, function (field) {
                "use strict";

                var question;

                if (_.isArray(field)) {
                    question = this.getQuestions(field, default_model);
                } else {
                    type = 'transform' + _.capitalize(field.type) + 'Field';
                    if (!Transformers[type]) {
                        console.error(type);
                        type = 'transformDefaultField';
                    }
                    question = Transformers[type](field, _.get(default_model, field.key));
                }

                if (question != null) {
                    return questions.push(question);
                }
            });
            return questions;
        }
    }, {
        key: 'queries',
        value: function queries(schema, form, model) {
            var schema_form = [];

            _.forEach(form, function (field) {
                if (_.isString(field)) {
                    field = { key: field };
                }

                if (field.key !== '*') {
                    // normal fields
                    schema_form.push(this.getNormalField(schema, field));
                } else if (field.key === '*') {
                    // dynamic form indicated by asterisk to indicate all fields
                    this.getAsteriskFields(schema, schema_form);
                }
            });
            return this.askQuestions(schema_form, model);
        }
    }]);
    return ClassFields;
}();

var Fields = new ClassFields();

var inquirer$1 = require('inquirer');

var ClassInput = function () {
    function ClassInput() {
        classCallCheck(this, ClassInput);
    }

    createClass(ClassInput, [{
        key: 'ask',
        value: function ask(message, _default) {
            return inquirer$1.prompt([{
                name: 'response',
                message: message,
                type: 'input',
                default: _default
            }]).then(function (answers) {
                return answers.response;
            });
        }
    }, {
        key: 'secret',
        value: function secret(message, _default) {
            console.log(message);
            return inquirer$1.prompt([{
                name: 'response',
                message: message,
                type: 'password',
                default: _default
            }]).then(function (answers) {
                return answers.response;
            });
        }
    }, {
        key: 'confirm',
        value: function confirm(message, _default) {
            return inquirer$1.prompt([{
                name: 'response',
                message: message,
                type: 'confirm',
                default: _default
            }]).then(function (answers) {
                return answers.response;
            });
        }
    }, {
        key: 'choose',
        value: function choose(message, choices, _default) {
            return inquirer$1.prompt([{
                name: 'response',
                message: message,
                type: 'list',
                choices: choices,
                default: _default
            }]).then(function (answers) {
                return answers.response;
            });
        }
    }, {
        key: 'choice',
        value: function choice(question, choices, selected) {
            "use strict";

            return inquirer$1.prompt([{
                name: 'response',
                message: question,
                type: 'list',
                choices: choices,
                default: selected
            }]).then(function (answers) {
                return answers.response;
            });
        }
    }]);
    return ClassInput;
}();

var Input = new ClassInput();

var chalk = require('chalk');
var Spinner = require('cli-spinner').Spinner;
var _$2 = require('lodash');
var ClassOutput = function () {
  function ClassOutput() {
    classCallCheck(this, ClassOutput);
  }

  createClass(ClassOutput, [{
    key: 'line',
    value: function line() {
      _$2.each(arguments, function (message) {
        if (!_$2.isString(message)) {
          message = JSON.stringify(message);
        }
        console.log(message);
      });
    }
  }, {
    key: 'info',
    value: function info() {
      _$2.each(arguments, function (message) {
        if (!_$2.isString(message)) {
          message = JSON.stringify(message);
        }
        console.info(chalk.cyan(message));
      });
    }
  }, {
    key: 'success',
    value: function success() {
      _$2.each(arguments, function (message) {
        if (!_$2.isString(message)) {
          message = JSON.stringify(message);
        }
        console.info(chalk.green(message));
      });
    }
  }, {
    key: 'error',
    value: function error() {
      _$2.each(arguments, function (message) {
        if (!_$2.isString(message)) {
          message = JSON.stringify(message);
        }
        console.error(chalk.white.bgRed(message));
      });
    }
  }, {
    key: 'warning',
    value: function warning() {
      _$2.each(arguments, function (message) {
        if (!_$2.isString(message)) {
          message = JSON.stringify(message);
        }
        console.warn(chalk.yellow(message));
      });
    }
  }, {
    key: 'spinner',
    value: function spinner(message) {
      var spinner = new Spinner(message + '...%s');
      spinner.setSpinnerString('|/-\\');
      return spinner;
    }
  }]);
  return ClassOutput;
}();

var Output = new ClassOutput();

function init() {}

export { init, Fields, Input, Output };
//# sourceMappingURL=index.mjs.map
