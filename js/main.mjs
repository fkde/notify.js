import prompt from "./src/Modules/prompt.mjs";
import alert from "./src/Modules/alert.mjs";
import NotEmpty from "./src/Validation/Validators/NotEmpty.mjs";
import Range from "./src/Validation/Validators/Range.mjs";
import Enum from "./src/Validation/Validators/Enum.mjs";
import IsString from "./src/Validation/Validators/IsString.js";

const questions = [
    {
        title: 'Wie heißt Du?',
        validators: [
            new NotEmpty(),
            new IsString(),
        ]
    },
    {
        title: 'Wie alt bist Du?',
        validators: [
            new NotEmpty(),
            new Range(16, 99)
        ]
    },
    {
        title: 'In welcher Stadt wohnst Du?',
        validators: [
            new NotEmpty(),
            new Enum(['München', 'Jodel', 'Frankfurt'])
        ]
    }
];

const answers = [];

for (let i in questions) {

    const question = questions[i];
    const result = await prompt(question.title, {
        showInput: true,
        confirmButtonText: 'Weiter',
        cancelButtonText: 'Abbrechen',
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

if (answers.length) {
    await alert('Vielen Dank für Deine Antworten, ' + answers[0].answer + '!');
    console.log(answers);
}