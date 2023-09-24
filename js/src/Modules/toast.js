class Toast {

    constructor(message, options = {}) {

        this.message = message;
        this.options = options;
        this.container = null;

        this.render();

    }

    render() {

        const timeout = this.options.timeout || 3000;

        const content = `<div class="toast notificator top-right">${this.message}</div>`;
        this.container = (new DOMParser()).parseFromString(content, 'text/html').body.firstElementChild;

        if (this.options.targetContainer instanceof HTMLDivElement) {
            this.options.targetContainer.appendChild(this.container);
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

    const wrap = `<div class="notificator-wrap"></div>`;
    const wrapDom = (new DOMParser()).parseFromString(wrap, 'text/html').body.firstElementChild;
    document.body.appendChild(wrapDom);

    for (let i in Object.keys(message)) {

        const item = message[i];

        setTimeout(function() {
            options = {...options, targetContainer: wrapDom};
            new Toast(item, options);
        }, 1500);

    }

};