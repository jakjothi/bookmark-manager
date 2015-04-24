'use strict';

var service = {},
    access = require('safe-access'),
    BookmarkDirectory = require('../models/bookmarkDirectory.model'),
    createQuery;

createQuery = function(userId) {
    return {
        userId: userId
    };
};

service.getBookmarkDirectories = function(req) {
    return BookmarkDirectory
        .findAsync(createQuery(access(req, 'user.id')));
};

service.createBookmarkDirectory = function(req) {
    return BookmarkDirectory
        .createAsync({
            userId: access(req, 'user.id'),
            directoryName: access(req, 'body.directoryName')
        });
};

service.removeBookmarkDirectoryById = function(userId, directoryId) {
    return BookmarkDirectory
        .removeAsync({
            _id: directoryId,
            userId: userId
        });
};

module.exports = service;
