'use strict';

var BookmarkApp,
	service,
	app,
	server;

require('./config/init')();

BookmarkApp = require('./config/express');

service = new BookmarkApp();
service.initialize();
server = service.start();

exports = module.exports = server;
