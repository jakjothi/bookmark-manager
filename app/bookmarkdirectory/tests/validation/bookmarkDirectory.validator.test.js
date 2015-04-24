'use strict';

var expect = require('chai').expect,
    bookmarkDirectoryValidator = require('../../validation/bookmarkDirectory.validator');

describe('Unit tests', function() {
    describe('BookmarkDirectory validator', function() {
        var validParameter,
            invalidParameter;

        it('should exist', function(done) {
            expect(bookmarkDirectoryValidator).to.exist;
            done();
        });

        beforeEach(function(done) {
            validParameter = {
                directoryName: 'social'
            };

            invalidParameter = {};
            done();
        });

        describe('method', function() {
            describe('validate', function() {
                it('should be a function', function(done) {
                    expect(bookmarkDirectoryValidator.validate).to.be.instanceOf(Function);
                    done();
                });

                it('should return true if parameter is valid', function(done) {
                    expect(bookmarkDirectoryValidator.validate(validParameter)).to.be.true;
                    done();
                });

                it('should return false if parameter is invalid', function(done) {
                    var invalidParameter = {};

                    expect(bookmarkDirectoryValidator.validate(invalidParameter)).to.be.false;
                    done();
                });
            });

            describe('getErrors', function() {
                it('should be a function', function(done) {
                    expect(bookmarkDirectoryValidator.getErrors).to.be.instanceOf(Function);
                    done();
                });

                it('should return empty array for valid parameter', function(done) {
                    var errors = bookmarkDirectoryValidator.getErrors(validParameter);

                    expect(errors).to.be.instanceof(Array);
                    expect(errors).to.be.empty;
                    done();
                });

                it('should return not empty array for invalid parameter', function(done) {
                    var errors = bookmarkDirectoryValidator.getErrors(invalidParameter);

                    expect(errors).to.be.instanceof(Array);
                    expect(errors).to.be.not.empty;
                    done();
                });
            });
        });
    });
});
