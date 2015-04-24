'use strict';

var Joi = require('joi');

module.exports = Joi
    .object()
    .keys({
        directoryName: Joi
            .string()
            .min(1)
            .required()
    });
