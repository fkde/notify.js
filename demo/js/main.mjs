import prompt from "../../src/modules/Prompt.mjs";
import alert from "../../src/modules/Alert.mjs";
import NotEmpty from "../../src/Validators/NotEmpty.mjs";
import Range from "../../src/Validators/Range.mjs";
import Enum from "../../src/Validators/Enum.mjs";
import IsString from "../../src/Validators/IsString.js";

const questions = [
    {
        title: 'What\'s your name?',
        validators: [
            new NotEmpty(),
            new IsString(),
        ]
    },
    {
        title: 'How old are you?',
        validators: [
            new NotEmpty(),
            new Range(16, 99)
        ]
    },
    {
        title: 'In which country do you live in?',
        validators: [
            new NotEmpty(),
            new Enum(['Germany', 'France', 'Japan'])
        ]
    }
];

const answers = [];

const renderQuestions = async () => {

    for (let i in questions) {

        const question = questions[i];
        const result = await prompt(question.title, {
            showInput: true,
            confirmButtonText: 'Next',
            validators: [
                ...question.validators
            ]
        });

        if (false === result) {
            break;
        }

        answers.push({
            question: question.title,
            answer: result
        });

    }

    return answers;

};

renderQuestions().then((answers) => {
    if (answers.length) {
        alert('Thank you for your answers, ' + answers[0].answer + '!');
        console.log(answers);
    }
});