import Validator from "../Validator.mjs";


class Number extends Validator {

    errorMessage = 'Value must be numeric.';

    validate(value) {
        return typeof value === 'number';
    }

}

export default Number;