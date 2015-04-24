'use strict';

var bookmarkDirectoryController,
    sharedBehaviors = require('../../../../tests/sharedBehaviors'),
    chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    request,
    response,
    next;

chai.use(sinonChai);

describe('Bookmark directory controller', function() {
    before(function() {
        bookmarkDirectoryController = require('../../controllers/bookmarkDirectory.controller');
    });

    beforeEach(function() {
        request = sharedBehaviors.getRequestMock();
        response = sharedBehaviors.getResponseMock();
        next = sharedBehaviors.getNextMock();
    });

    it('should be defined object', function(done) {
        expect(bookmarkDirectoryController).to.be.a('object');
        done();
    });

    describe('getBookmarkDirectories method', function() {
        it('should exist', function(done) {
            expect(bookmarkDirectoryController.getBookmarkDirectories).to.be.a('function');
            done();
        });

        it('should run controller getBookmarkDirectories method', function() {
            var spy = sinon.spy(bookmarkDirectoryController, 'getBookmarkDirectories');

            bookmarkDirectoryController.getBookmarkDirectories(request, response, next);

            expect(spy).to.have.been.callCount(1);
        });
    });

    describe('createBookmarkDirectory method', function() {
        it('should exist', function(done) {
            expect(bookmarkDirectoryController.createBookmarkDirectory).to.be.a('function');
            done();
        });

        it('should run controller createBookmarkDirectory method', function() {
            var spy = sinon.spy(bookmarkDirectoryController, 'createBookmarkDirectory');
            bookmarkDirectoryController.createBookmarkDirectory(request, response, next);
            expect(spy).to.have.been.callCount(1);
        });
    });

    describe('getDirectoryBookmarks method', function() {
        it('should exist', function(done) {
            expect(bookmarkDirectoryController.getDirectoryBookmarks).to.be.a('function');
            done();
        });

        it('should run controller getDirectoryBookmarks method', function() {
            var spy = sinon.spy(bookmarkDirectoryController, 'getDirectoryBookmarks');
            bookmarkDirectoryController.getDirectoryBookmarks(request, response, next);
            expect(spy).to.have.been.callCount(1);
        });
    });

    describe('removeBookmarkDirectoryById method', function() {
        it('should exist', function(done) {
            expect(bookmarkDirectoryController.removeBookmarkDirectoryById).to.be.a('function');
            done();
        });

        it('should run controller removeBookmarkDirectoryById method', function() {
            var spy = sinon.spy(bookmarkDirectoryController, 'removeBookmarkDirectoryById');

            bookmarkDirectoryController.removeBookmarkDirectoryById(request, response, next);
            expect(spy).to.have.been.callCount(1);
        });
    });
});
