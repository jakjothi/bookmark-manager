'use strict';

var mongoose = require('mongoose'),
    Bluebird = require('bluebird'),
    BookmarkDirectorySchema,
    BookmarkDirectoryModel;

BookmarkDirectorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    directoryName: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    }
},
{
    versionKey: false
});

if (!BookmarkDirectorySchema.options.toObject) {
    BookmarkDirectorySchema.options.toObject = {};
}

BookmarkDirectorySchema.options.toObject.transform = function(doc) {
    return {
        directoryId: doc._id,
        userId: doc.userId,
        directoryName: doc.directoryName
    };
};

BookmarkDirectoryModel = mongoose.model('BookmarkDirectory', BookmarkDirectorySchema);

Bluebird.promisifyAll(BookmarkDirectoryModel);
Bluebird.promisifyAll(BookmarkDirectoryModel.prototype);

module.exports = BookmarkDirectoryModel;
