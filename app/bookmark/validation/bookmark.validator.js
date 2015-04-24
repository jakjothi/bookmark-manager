'use strict';

var Validator = require('../../core/validation/Validator'),
    schema = require('./bookmark.schema');

module.exports = new Validator(schema);
