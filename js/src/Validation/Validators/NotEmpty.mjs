import Validator from "../Validator.mjs";


class NotEmpty extends Validator {

    errorMessage = 'Must not be empty';

    validate(value) {
        return (!!value.length);
    }

}

export default NotEmpty;