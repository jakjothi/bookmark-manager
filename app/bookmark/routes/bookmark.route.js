'use strict';

var bookmarkController = require('../controllers/bookmark.controller'),
	bookmarkValidator = require('../validation/validator');

module.exports = function(app) {
    app
        .route('/bookmarks')
        .get(bookmarkController.getBookmarksById)
        .post(bookmarkValidator.validate, bookmarkController.createBookmark);

    app
        .route('/bookmarks/:bookmarkId')
        .put(bookmarkController.updateBookmarkById)
        .delete(bookmarkController.removeBookmarkById);
};
