import Notify from "../Notify.js";

class Alert extends Notify{

    defaultOptions = {
        style: {
            backgroundColor: '#29303C'
        },
        confirmButtonText: 'Okay'
    };

    bind() {

        const alert = document.querySelector('.alert')
        const buttonOk = alert.querySelector('.confirm');

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

    render () {

        const content = `
                <div class="notify alert">
                    ${this.message}
                    <div class="container single">
                        <div class="button confirm">${this.options.confirmButtonText}</div>
                    </div>
                </div>`;

        this.container = (new DOMParser()).parseFromString(content, 'text/html').body.firstElementChild;

        document.body.appendChild(this.container);

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
        new Alert(message, options,{resolve, reject});
    });

};