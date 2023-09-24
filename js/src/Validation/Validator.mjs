class Validator {

    errorMessage = '';

    /**
     * @param {Number|String|Boolean} value
     *
     * @return boolean
     */
    validate(value) {
        throw new Error('Must be implemented by children.');
    }

}

export default Validator;