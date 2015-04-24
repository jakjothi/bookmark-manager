'use strict';

var responseMiddleware = require('../../middlewares/response.middleware'),
    sharedBehaviors = require('../../../../tests/sharedBehaviors'),
    chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    request,
    response,
    next;

chai.use(sinonChai);

describe('responseMiddleware', function() {
    before(function() {
        request = sharedBehaviors.getRequestMock();
        response = sharedBehaviors.getResponseMock();
        next = sharedBehaviors.getNextMock();
    });

    it('should be defined object', function() {
        expect(responseMiddleware).to.be.a('object');
    });
});
