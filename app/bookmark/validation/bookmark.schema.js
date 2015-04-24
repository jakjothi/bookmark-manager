'use strict';

var Joi = require('joi');

module.exports = Joi
    .object()
    .keys({
        title: Joi
            .string()
            .required(),
        url: Joi
            .string()
            .required(),
        directoryId: Joi
            .string()
            .length(24)
            .regex(/^[0-9A-F]+$/i)
            .required()
    });
