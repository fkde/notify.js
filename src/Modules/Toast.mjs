import translate from "../Translator.mjs";

class Toast {

    #defaultOptions = {
        style: {
            backgroundColor: '#29303C'
        }
    };

    constructor(message, options = {}) {

        this.message = message;
        this.options = {...this.#defaultOptions, ...options};
        this.container = null;

        this.render();

    }

    render() {

        const timeout = this.options.timeout || 3000;

        const translatedMessage = translate(this.message);

        const content = `<div class="toast notify top-right">${translatedMessage}</div>`;
        this.container = (new DOMParser()).parseFromString(content, 'text/html').body.firstElementChild;

        if (this.options.targetContainer instanceof HTMLDivElement) {
            this.options.targetContainer.prepend(this.container);
        } else {
            document.body.appendChild(this.container);
        }

        setTimeout(() => {

            this.container.classList.add('closing');

            this.container.addEventListener('animationend', (e) => {
                e.target.parentNode.removeChild(e.target);
            });

        }, timeout);

    }

}

export default function toast(message, options) {

    if (typeof message === 'string') {
        return new Toast(message, options);
    }

    let wrap = document.querySelector('.notify-toast-container');

    if (!(wrap instanceof HTMLDivElement)) {
        const wrapTemplate = `<div class="notify-toast-container"></div>`;
        wrap = (new DOMParser()).parseFromString(wrapTemplate, 'text/html').body.firstElementChild;
        document.body.appendChild(wrap);
    }

    for (let i in Object.keys(message)) {

        const item = message[i];

        setTimeout(function() {
            new Toast(item, {...options, targetContainer: wrap});
        }, 50);

    }

};