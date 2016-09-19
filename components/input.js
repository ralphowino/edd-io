var inquirer = require('inquirer');

class ClassInput {
    ask(message, _default) {
        return inquirer.prompt([{
            name: 'response',
            message: message,
            type: 'input',
            default: _default
        }]).then(function (answers) {
            return answers.response;
        });
    }

    secret(message, _default) {
        console.log(message);
        return inquirer.prompt([{
            name: 'response',
            message: message,
            type: 'password',
            default: _default
        }]).then(function (answers) {
            return answers.response;
        });
    }

    confirm(message, _default) {
        return inquirer.prompt([{
            name: 'response',
            message: message,
            type: 'confirm',
            default: _default
        }]).then(function (answers) {
            return answers.response;
        });
    }

    choose(message, choices, _default) {
        return inquirer.prompt([{
            name: 'response',
            message: message,
            type: 'list',
            choices: choices,
            default: _default
        }]).then(function (answers) {
            return answers.response;
        });
    }

    choice(question, choices, selected) {
        "use strict";
        return inquirer.prompt([{
            name: 'response',
            message: question,
            type: 'list',
            choices: choices,
            default: selected
        }]).then(function (answers) {
            return answers.response;
        });
    }
}
export let Input = new ClassInput();