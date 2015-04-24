'use strict';

var bookmarkDirectoryValidator = require('./bookmarkDirectory.validator'),
    handleValidationError = require('../../core/lib/handleValidationError');

exports.validate = function(req, res, next) {
    var errors = bookmarkDirectoryValidator.getErrors(req.body);
    handleValidationError(errors, res, next);
};
