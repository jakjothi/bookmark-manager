'use strict';

var service = {},
    access = require('safe-access'),
    Bookmark = require('../models/bookmark.model'),
    Bluebird = require('bluebird'),
    createQuery;

createQuery = function(bookmarkId) {
    return {
        _id: bookmarkId
    };
};

service.getBookmarksById = function(userId) {
    return Bookmark
        .findAsync({
        userId: userId
    });
};

service.createBookmark = function(req) {
    return Bookmark
        .createAsync({
            userId: access(req, 'user.id'),
            directoryId: access(req, 'body.directoryId'),
            title: access(req, 'body.title'),
            url: access(req, 'body.url')
        });
};

service.updateBookmarkById = function(bookmarkId, modelData) {
    return Bookmark
        .findByIdAndUpdateAsync(bookmarkId, {
            $set: modelData
        });
};

service.removeBookmarkById = function(bookmarkId) {
    return Bookmark
        .removeAsync(createQuery(bookmarkId));
};

service.getBookmarksByDirectoryId = function(params) {
    return Bookmark
        .findAsync(params);
};

module.exports = service;
