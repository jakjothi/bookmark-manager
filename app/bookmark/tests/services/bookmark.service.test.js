'use strict';

var bookmarkService,
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    expect = chai.expect;

chai.use(sinonChai);

describe('Bookmark service', function() {
    before(function() {
        bookmarkService = require('../../services/bookmark.service');
    });

    it('should be defined object', function(done) {
        expect(bookmarkService).to.be.a('object');
        done();
    });

    describe('getBookmarksById method', function() {
        it('should exist', function(done) {
            expect(bookmarkService.getBookmarksById).to.be.a('function');
            done();
        });

        it('should run service getBookmarksById method', function() {
            var spy = sinon.spy(bookmarkService, 'getBookmarksById');

            bookmarkService.getBookmarksById();
            expect(spy).to.have.been.callCount(1);
        });
    });

    describe('createBookmark method', function() {
        it('should exist', function(done) {
            expect(bookmarkService.createBookmark).to.be.a('function');
            done();
        });

        it('should run service createBookmark method', function() {
            var spy = sinon.spy(bookmarkService, 'createBookmark'),
                bookmark = {user: {id: 'a'}, body: {directoryId: '123', title: 'example', url: 'http://google.com'}};
            bookmarkService.createBookmark(bookmark);
            expect(spy).to.have.been.callCount(1);
        });
    });

    describe('updateBookmarkById method', function() {
        it('should exist', function(done) {
            expect(bookmarkService.updateBookmarkById).to.be.a('function');
            done();
        });

        it('should run service updateBookmarkById method', function() {
            var spy = sinon.spy(bookmarkService, 'updateBookmarkById');
            bookmarkService.updateBookmarkById();
            expect(spy).to.have.been.callCount(1);
        });
    });

    describe('getBookmarksByDirectoryId method', function() {
        it('should exist', function(done) {
            expect(bookmarkService.getBookmarksByDirectoryId).to.be.a('function');
            done();
        });

        it('should run service getBookmarksByDirectoryId method', function() {
            var spy = sinon.spy(bookmarkService, 'getBookmarksByDirectoryId');
            bookmarkService.getBookmarksByDirectoryId();
            expect(spy).to.have.been.callCount(1);
        });
    });

    describe('removeBookmarkById method', function() {
        it('should exist', function(done) {
            expect(bookmarkService.removeBookmarkById).to.be.a('function');
            done();
        });

        it('should run service removeBookmarkById method', function() {
            var spy = sinon.spy(bookmarkService, 'removeBookmarkById');

            bookmarkService.removeBookmarkById();
            expect(spy).to.have.been.callCount(1);
        });
    });
});
