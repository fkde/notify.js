import Validator from "../Validator.mjs";


class Range extends Validator {

    constructor(min, max) {
        super();
        this.min = min;
        this.max = max;
        this.errorMessage = `Only numbers between ${min} and ${max} are allowed.`;
    }

    validate(value) {
        return !isNaN(value) && value >= this.min && value <= this.max;
    }

}

export default Range;