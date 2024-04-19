import Validator from "../Validator.mjs";
import NotEmpty from "../Validators/NotEmpty.mjs";
import toast from "./Toast.mjs";
import Notify from "../Notify.js";

class Prompt extends Notify {

    defaultOptions = {
        style: {
            backgroundColor: 'red'
        },
        showInput: false,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCancelButton: true,
        validators: [
            new NotEmpty()
        ]
    };

    bind() {

        const inputElement  = this.container.querySelector('.input');
        const buttonConfirm = this.container.querySelector('.confirm');
        const buttonCancel  = this.container.querySelector('.cancel');

        if (inputElement) {
            inputElement.addEventListener('keydown', (e) => {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    buttonConfirm.click();
                }
            });
        }

        buttonConfirm.addEventListener('click', () => {

            const inputElementValue = (inputElement instanceof HTMLDivElement)
                ? inputElement.textContent
                : null;

            const validatorResult = this.runValidators(inputElementValue, inputElement);

            if (validatorResult.length) {
                inputElement.classList.add('error');
                inputElement.focus();
                const range = document.createRange();
                const sel = window.getSelection();
                if (inputElement.textContent.length) {
                    range.setStart(inputElement.childNodes[0], inputElementValue.length);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
                toast(validatorResult);
                return;
            }

            this.promise.resolve(inputElementValue || true);
            this.remove();

        });

        if (buttonCancel instanceof HTMLDivElement) {
            buttonCancel.addEventListener('click', () => {
                this.promise.resolve(false);
                this.remove();
            });
        }

    }

    runValidators(value) {

        const errors = [];

        if (this.options.showInput && Object.keys(this.options.validators).length) {
            for (let index in this.options.validators) {
                const validator = this.options.validators[index];
                if (validator instanceof Validator) {
                    if (false === validator.validate(value)) {
                        errors.push(validator.errorMessage);
                        return errors;
                    }
                }
            }
        }
        return errors;
    }

    render() {

        const inputElement = (true === this.options.showInput)
            ? `<div class="input" contenteditable="true"></div>`
            : '';

        const cancelButton = (true === this.options.showCancelButton)
            ? `<div class="button cancel">${this.options.cancelButtonText}</div>`
            : '';

        const isSingle = (!cancelButton) ? ' single' : '';

        const content = `
            <div class="notify prompt">
                <div class="close"></div>
                <div class="message">${this.message}</div>
                ${inputElement}
                <div class="container${isSingle}">
                    <div class="button confirm">${this.options.confirmButtonText}</div>
                    ${cancelButton}
                </div>
            </div>`;

        this.container = (new DOMParser()).parseFromString(content, 'text/html').body.firstElementChild;
        document.body.appendChild(this.container);

        if (this.options.showInput) {
            this.container.querySelector('.input').focus();
        }

    }

    remove() {
        this.container.classList.add('closing');
        this.container.addEventListener('animationend', () => {
            if (this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }
        });
    }

}

export default prompt = (message, options) => {

    return new Promise((resolve, reject) => {
        new Prompt(message, options, {resolve, reject});
    });

};