'use strict';

var _ = require('lodash'),
    access = require('safe-access'),
    bookmarkDirectoryService = require('../services/bookmarkDirectory.service'),
    bookmarkService = require('../../bookmark/services/bookmark.service');

exports.getBookmarkDirectories = function(req, res, next) {
    bookmarkDirectoryService
        .getBookmarkDirectories(req)
        .map(function(bookmark) {
            return bookmark.toObject();
        })
        .then(function(data) {
            if (_.isEmpty(data)) {
                res.sendNoContent();
            } else {
                res.sendSuccess({data: data});
            }
        })
        .catch(function(err) {
            next(err);
        });
};

exports.createBookmarkDirectory = function(req, res, next) {
    bookmarkDirectoryService
        .createBookmarkDirectory(req)
        .then(function(data) {
            res.sendCreated(data.toObject());
        })
        .catch(function(err) {
            next(err);
        });
};

exports.removeBookmarkDirectoryById = function(req, res, next) {
    var userId = access(req, 'user.id');
    bookmarkDirectoryService
        .removeBookmarkDirectoryById(userId, req.params.bookmarkDirectoryId)
        .then(function(data) {
            if (data) {
                res.status(202).send();
            } else {
                res.sendNoContent();
            }
        })
        .catch(function(err) {
            next(err);
        });
};

exports.getDirectoryBookmarks = function(req, res, next) {
    bookmarkService
        .getBookmarksByDirectoryId({userId: access(req, 'user.id'), directoryId: req.params.bookmarkDirectoryId})
        .map(function(bookmark) {
            return bookmark.toObject();
        })
        .then(function(data) {
            if (_.isEmpty(data)) {
                res.sendNoContent();
            } else {
                res.sendSuccess({data: data});
            }
        })
        .catch(function(err) {
            next(err);
        });
};

