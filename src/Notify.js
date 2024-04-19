export default class Notify {

    defaultOptions = {
        style: {
            backgroundColor: '#29303C'
        }
    };

    constructor(message, options, promise) {
        this.message   = message;
        this.options   = {...this.defaultOptions, ...options};
        this.promise   = promise;
        this.container = null;

        this.render();
        Object.assign(this.container.style, this.options.style);
        this.bind();
    }

    bind() {
        throw new Error('May be overridden by sub classes.');
    }

    render() {
        throw new Error('May be overridden by sub classes.');
    }

    remove() {
        throw new Error('May be overridden by sub classes.');
    }

};