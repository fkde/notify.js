import Validator from "../Validator.mjs";


class IsNumber extends Validator {

    errorMessage = 'Value must be numeric.';

    validate(value) {
        return typeof value === 'number';
    }

}

export default IsNumber;