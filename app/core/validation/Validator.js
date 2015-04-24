'use strict';

var validate = require('joi').validate,
    Validator;

Validator = function(schema) {
    this.schema = schema;
};

Validator.prototype.validate = function(value) {
    return validate(value, this.schema, {allowUnknown: true}).error === null;
};

Validator.prototype.getErrors = function(value) {
    return (validate(value, this.schema, {abortEarly: false, allowUnknown: true}).error || {}).details || [];
};

module.exports = Validator;
