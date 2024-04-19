import NotEmpty from "../Validators/NotEmpty.mjs";

export default class Notify {

    #defaultOptions = {
        style: {
            backgroundColor: '#29303C'
        }
    };

    constructor(message, options, promise) {
        this.message   = message;
        this.options   = {...this.#defaultOptions, ...options};
        this.promise   = promise;
        this.container = null;
    }

};