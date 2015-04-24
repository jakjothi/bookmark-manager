'use strict';

var mockery = require('mockery'),
    httpMocks = require('node-mocks-http');

module.exports = {
    mockery: function() {
        before(function() {
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
        });

        after(function() {
            mockery.disable();
        });
    },
    getRequestMock: function() {
        return httpMocks.createRequest();
    },
    getResponseMock: function() {
        var response = httpMocks.createResponse();

        response.sendSuccess = function() {
        };
        response.sendNoContent = function() {
        };
        response.sendNotFound = function() {
        };
        response.sendConflict = function() {
        };
        response.sendCreated = function() {
        };
        response.sendBadRequest = function() {
        };

        return response;
    },
    getNextMock: function() {
        return function() {
        };
    }
};