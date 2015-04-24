'use strict';

var bookmarkController,
    sharedBehaviors = require('../../../../tests/sharedBehaviors'),
    chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    request,
    response,
    next;

chai.use(sinonChai);

describe('Bookmark controller', function() {
    before(function() {
        bookmarkController = require('../../controllers/bookmark.controller');
    });

    beforeEach(function() {
        request = sharedBehaviors.getRequestMock();
        response = sharedBehaviors.getResponseMock();
        next = sharedBehaviors.getNextMock();
    });

    it('should be defined object', function(done) {
        expect(bookmarkController).to.be.a('object');
        done();
    });

    describe('getBookmarksById method', function() {
        it('should exist', function(done) {
            expect(bookmarkController.getBookmarksById).to.be.a('function');
            done();
        });

        it('should run controller getBookmarksById method', function() {
            var spy = sinon.spy(bookmarkController, 'getBookmarksById');

            bookmarkController.getBookmarksById(request, response, next);

            expect(spy).to.have.been.callCount(1);
        });
    });

    describe('createBookmark method', function() {
        it('should exist', function(done) {
            expect(bookmarkController.createBookmark).to.be.a('function');
            done();
        });

        it('should run controller createBookmark method', function() {
            var spy = sinon.spy(bookmarkController, 'createBookmark');
            bookmarkController.createBookmark(request, response, next);
            expect(spy).to.have.been.callCount(1);
        });
    });

    describe('updateBookmarkById method', function() {
        it('should exist', function(done) {
            expect(bookmarkController.updateBookmarkById).to.be.a('function');
            done();
        });

        it('should run controller updateBookmarkById method', function() {
            var spy = sinon.spy(bookmarkController, 'updateBookmarkById');
            bookmarkController.updateBookmarkById(request, response, next);
            expect(spy).to.have.been.callCount(1);
        });
    });

    describe('removeBookmarkById method', function() {
        it('should exist', function(done) {
            expect(bookmarkController.removeBookmarkById).to.be.a('function');
            done();
        });

        it('should run controller removeBookmarkById method', function() {
            var spy = sinon.spy(bookmarkController, 'removeBookmarkById');

            bookmarkController.removeBookmarkById(request, response, next);
            expect(spy).to.have.been.callCount(1);
        });
    });
});
