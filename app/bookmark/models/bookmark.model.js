'use strict';

var mongoose = require('mongoose'),
    Bluebird = require('bluebird'),
    BookmarkSchema,
    BookmarkModel;

BookmarkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    userId: {
        type: String
    },
    directoryId: {
        type: String
    }
},
{
    versionKey: false
});

if (!BookmarkSchema.options.toObject) {
    BookmarkSchema.options.toObject = {};
}

BookmarkSchema.options.toObject.transform = function(doc) {
    return {
        bookmarkId: doc._id,
        directoryId: doc.directoryId,
        userId: doc.userId,
        title: doc.title,
        url: doc.url
    };
};

BookmarkModel = mongoose.model('Bookmark', BookmarkSchema);

Bluebird.promisifyAll(BookmarkModel);
Bluebird.promisifyAll(BookmarkModel.prototype);

module.exports = BookmarkModel;
