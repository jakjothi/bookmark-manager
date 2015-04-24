'use strict';

var bookmarkValidator = require('./bookmark.validator'),
    handleValidationError = require('../../core/lib/handleValidationError');

exports.validate = function(req, res, next) {
    var errors = bookmarkValidator.getErrors(req.body);
    handleValidationError(errors, res, next);
};
