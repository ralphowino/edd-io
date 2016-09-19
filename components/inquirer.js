var inquirer = require('inquirer');

class ClassInquirer {
    loopQuestions(questions_array, index, answers) {
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
                return this.loopQuestions(questions_array, index + 1, answers)
            }
        });
    }

    /**
     * Modified version of inquirer prompt function
     * @param questions_array
     * @returns {Promise<T>|Promise}
     */
    prompt(questions_array) {
        return new Promise(function (resolve) {
            return resolve(this.loopQuestions(questions_array));
        });
    }
}
export let Inquirer = new ClassInquirer();