'use strict';

var mongoose = require('mongoose');

function Database(db) {
    this.db = db;
}

Database.prototype.connect = function() {
    var conn = mongoose.connect(this.getConnectionString());

    mongoose.connection.on('connected', function() {
        console.log('%s: Mongoose connected...', Date(Date.now()));
    });

    mongoose.connection.on('error', function(err) {
        console.log('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose default connection disconnected');
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('Mongoose default connection disconnected through app termination SIGINT');
            process.exit(0);
        });
    });

    return conn;
};

Database.prototype.getConnectionString = function() {
    return this.db;
};

module.exports = Database;
