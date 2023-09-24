const alert = (message, options = {}) => {

    const settings = {
        backgroundColor: options.backgroundColor || '#202020'
    };

    return new Promise((resolve, reject) => {

        const init = () => {
            try {
                render();
                bindClickEvents();
            } catch (e) {
                reject(e);
            }
        };

        const render = () => {

            const content = `
                <div class="notificator alertness">
                    ${message}
                    <div class="container single">
                        <div class="button confirm">Ok</div>
                    </div>
                </div>`;

            document.body.appendChild((new DOMParser()).parseFromString(content, 'text/html').body.firstElementChild);

            bindClickEvents();

        };

        const bindClickEvents = () => {

            const alertness = document.querySelector('.alertness')
            const buttonOk = document.querySelector('.alertness .confirm');

            alertness.addEventListener('keydown', (e) => {

                console.log("hallo");

            });

            buttonOk.addEventListener('click', () => {
                resolve(true);
                remove();
            });

        };

        const remove = () => {
            const container = document.querySelector('.alertness');
            container.classList.add('closing');
            container.addEventListener('animationend', () => {
                if (container.parentNode) {
                    container.parentNode.removeChild(container);
                }
            });
        };

        return init();

    });

};

export default alert;