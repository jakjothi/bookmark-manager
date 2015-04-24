'use strict';

var Validator = require('../../core/validation/Validator'),
    schema = require('./bookmarkDirectory.schema');

module.exports = new Validator(schema);
