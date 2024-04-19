class Alert {

    #defaultOptions = {
        style: {
            backgroundColor: '#29303C'
        },
        confirmButtonText: 'Ok'
    };

    constructor(message, options, promise) {

        this.message   = message;
        this.options   = {...this.#defaultOptions, ...options};
        this.promise   = promise;
        this.container = null;

    }

    render () {

        const content = `
                <div class="notify alert">
                    ${this.message}
                    <div class="container single">
                        <div class="button confirm">Ok</div>
                    </div>
                </div>`;

        this.container = (new DOMParser()).parseFromString(content, 'text/html').body.firstElementChild;

        document.body.appendChild(this.container);

    };

    bindClickEvents() {

        const alert = document.querySelector('.alert')
        const buttonOk = document.querySelector('.alert .confirm');

        document.addEventListener('keydown', (e) => {

            switch(e.code) {
                case 'Enter':
                    e.preventDefault();
                    this.promise.resolve(true);
                    this.remove();
                    break;
                default:
                    break;
            }

        });

        buttonOk.addEventListener('click', () => {
            this.promise.resolve(true);
            this.remove();
        });

    };

    remove () {
        const container = document.querySelector('.alert');
        container.classList.add('closing');
        container.addEventListener('animationend', () => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        });
    };

}

export default alert = (message, options) => {

    return new Promise((resolve, reject) => {

        const alert = new Alert(message, options,{resolve, reject});
        alert.render();
        alert.bindClickEvents();

    });

};