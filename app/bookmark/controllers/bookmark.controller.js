'use strict';

var access = require('safe-access'),
    _ = require('lodash'),
    bookmarkService = require('../services/bookmark.service');

exports.getBookmarksById = function(req, res, next) {
    bookmarkService
        .getBookmarksById(access(req, 'user.id'))
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

exports.createBookmark = function(req, res, next) {
    bookmarkService
        .createBookmark(req)
        .then(function(data) {
            res.sendCreated(data.toObject());
        })
        .catch(function(err) {
            next(err);
        });
};

exports.updateBookmarkById = function(req, res, next) {
    var modelData = access(req, 'body');
    bookmarkService
        .updateBookmarkById(req.params.bookmarkId, modelData)
        .then(function(data) {
            res.sendCreated(data.toObject());
        })
        .catch(function(err) {
            next(err);
        });
};

exports.removeBookmarkById = function(req, res, next) {
    bookmarkService
        .removeBookmarkById(req.params.bookmarkId)
        .then(function(data) {
            if (data[0]) {
                res.status(202).send();
            } else {
                res.sendNoContent();
            }
        })
        .catch(function(err) {
            next(err);
        });
};
