'use strict';

var bookmarkDirectoryService,
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    expect = chai.expect;

chai.use(sinonChai);

describe('Bookmark directory service', function() {
    before(function() {
        bookmarkDirectoryService = require('../../services/bookmarkDirectory.service');
    });

    it('should be defined object', function(done) {
        expect(bookmarkDirectoryService).to.be.a('object');
        done();
    });

    describe('getBookmarkDirectories method', function() {
        it('should exist', function(done) {
            expect(bookmarkDirectoryService.getBookmarkDirectories).to.be.a('function');
            done();
        });

        it('should run service getBookmarkDirectories method', function() {
            var spy = sinon.spy(bookmarkDirectoryService, 'getBookmarkDirectories');

            bookmarkDirectoryService.getBookmarkDirectories();
            expect(spy).to.have.been.callCount(1);
        });
    });

    describe('createBookmarkDirectory method', function() {
        it('should exist', function(done) {
            expect(bookmarkDirectoryService.createBookmarkDirectory).to.be.a('function');
            done();
        });

        it('should run service createBookmarkDirectory method', function() {
            var spy = sinon.spy(bookmarkDirectoryService, 'createBookmarkDirectory'),
                dir = {user: {id: 'a'}, body: {directoryName: 'sample'}};
            bookmarkDirectoryService.createBookmarkDirectory(dir);
            expect(spy).to.have.been.callCount(1);
        });
    });

    describe('removeBookmarkDirectoryById method', function() {
        it('should exist', function(done) {
            expect(bookmarkDirectoryService.removeBookmarkDirectoryById).to.be.a('function');
            done();
        });

        it('should run service removeBookmarkDirectoryById method', function() {
            var spy = sinon.spy(bookmarkDirectoryService, 'removeBookmarkDirectoryById');

            bookmarkDirectoryService.removeBookmarkDirectoryById();
            expect(spy).to.have.been.callCount(1);
        });
    });
});
