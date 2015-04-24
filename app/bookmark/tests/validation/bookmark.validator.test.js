'use strict';

var expect = require('chai').expect,
    bookmarkValidator = require('../../validation/bookmark.validator');

describe('Unit tests', function() {
    describe('Bookmark validator', function() {
        var validParameter,
            invalidParameter;

        it('should exist', function(done) {
            expect(bookmarkValidator).to.exist;
            done();
        });

        beforeEach(function(done) {
            validParameter = {
                title: 'Google',
                url: 'http://google.com',
                directoryId: '507f1f77bcf86cd799439011'
            };

            invalidParameter = {};
            done();
        });

        describe('method', function() {
            describe('validate', function() {
                it('should be a function', function(done) {
                    expect(bookmarkValidator.validate).to.be.instanceOf(Function);
                    done();
                });

                it('should return true if parameter is valid', function(done) {
                    expect(bookmarkValidator.validate(validParameter)).to.be.true;
                    done();
                });

                it('should return false if parameter is invalid', function(done) {
                    var invalidParameter = {};

                    expect(bookmarkValidator.validate(invalidParameter)).to.be.false;
                    done();
                });
            });

            describe('getErrors', function() {
                it('should be a function', function(done) {
                    expect(bookmarkValidator.getErrors).to.be.instanceOf(Function);
                    done();
                });

                it('should return empty array for valid parameter', function(done) {
                    var errors = bookmarkValidator.getErrors(validParameter);

                    expect(errors).to.be.instanceof(Array);
                    expect(errors).to.be.empty;
                    done();
                });

                it('should return not empty array for invalid parameter', function(done) {
                    var errors = bookmarkValidator.getErrors(invalidParameter);

                    expect(errors).to.be.instanceof(Array);
                    expect(errors).to.be.not.empty;
                    done();
                });
            });
        });
    });
});
