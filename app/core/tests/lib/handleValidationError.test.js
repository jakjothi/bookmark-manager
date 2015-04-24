'use strict';

var handleValidationError = require('../../lib/handleValidationError'),
    sharedBehaviors = require('../../../../tests/sharedBehaviors'),
    chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    errors,
    response,
    next;

chai.use(sinonChai);

describe('handleValidationError', function() {
    before(function() {
        response = sharedBehaviors.getResponseMock();
        next = sharedBehaviors.getNextMock();
    });

    it('should be defined object', function() {
        expect(handleValidationError).to.be.a('function');
    });

    it('should call res.sendBadRequest', function() {
        var spy = sinon.spy(response, 'sendBadRequest');
        handleValidationError([1], response, next);
        expect(spy).to.have.been.callCount(1);
    });

    it('should call next', function() {
        var nextSpy = sinon.spy();
        handleValidationError([], response, nextSpy);
        expect(nextSpy).to.have.been.callCount(1);
    });
});
