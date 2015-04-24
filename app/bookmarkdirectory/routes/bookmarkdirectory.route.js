'use strict';

var bookmarkDirectoryController = require('../controllers/bookmarkDirectory.controller'),
	bookmarkDirectoryValidator = require('../validation/validator');

module.exports = function(app) {
    app
        .route('/bookmarks/directory')
        .get(bookmarkDirectoryController.getBookmarkDirectories)
        .post(bookmarkDirectoryValidator.validate, bookmarkDirectoryController.createBookmarkDirectory);

    app
        .route('/bookmarks/directory/:bookmarkDirectoryId')
        .delete(bookmarkDirectoryController.removeBookmarkDirectoryById);

    app
        .route('/bookmarks/directory/:bookmarkDirectoryId/bookmarks')
        .get(bookmarkDirectoryController.getDirectoryBookmarks);
};
