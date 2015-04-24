'use strict';

var expect = require('chai').expect,
    validator = require('../../validation/validator'),
    sharedBehaviors = require('../../../../tests/sharedBehaviors'),
    chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    request,
    response,
    next;

chai.use(sinonChai);

describe('Unit tests', function() {
    describe('Validator', function() {
        before(function() {
            request = sharedBehaviors.getRequestMock();
            response = sharedBehaviors.getResponseMock();
            next = sharedBehaviors.getNextMock();
        });

        it('should exist', function(done) {
            expect(validator).to.exist;
            done();
        });

        beforeEach(function(done) {
            request.body = {
            };
            done();
        });

        describe('method', function() {
            describe('validate', function() {
                it('should be a function', function(done) {
                    expect(validator.validate).to.be.instanceOf(Function);
                    done();
                });

                it('should call validate method', function(done) {
                    validator.validate(request, response, next);
                    done();
                });
            });
        });
    });
});
