'use strict';

var http = require('http');

exports.responseMiddleware = function(req, res, next) {

    res.sendSuccess = function(data) {
        res.status(200).json(data);
    };

    res.sendCreated = function(data) {
        res.status(201).json(data);
    };

    res.sendNotFound = function() {
        res
            .status(404)
            .json({
                status: 'error',
                code: 404,
                message: 'The requested data is not available in the storage. Please check the input you have provided.'
            });
    };

    res.sendConflict = function(message) {
        res
            .status(409)
            .json({
                status: 'error',
                code: 409,
                message: message
            });
    };

    res.sendBadRequest = function(message) {
        res
            .status(400)
            .json({
                status: 'error',
                code: 400,
                message: message
            });
    };

    res.sendRequestUriNotFound = function() {
        res
            .status(404)
            .json({
                status: 'error',
                code: 404,
                message: http.STATUS_CODES[404]
            });
    };

    res.sendNoContent = function() {
        res.status(204).send();
    };

    return next();
};
