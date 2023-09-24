import Validator from "../Validator.mjs";

class Enum extends Validator {



    constructor(allowedValues) {
        super();
        this.allowedValues = allowedValues;
        this.errorMessage = `Does not comply to expected values. Allowed values are [${allowedValues.join(', ')}]`;
    }

    validate(value, ) {
        return this.allowedValues.indexOf(value) !== -1;
    }

}

export default Enum;