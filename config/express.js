'use strict';

var http = require('http'),
    https = require('https'),
    fs = require('fs'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    access = require('safe-access'),
    consolidate = require('consolidate'),
    _ = require('lodash'),
    Database = require('../db/connection'),
    config = require('./config'),
    packageJson = require('../package.json'),
    applicationResopnse = require('../app/core/middlewares/response.middleware'),
    database;

function BookmarkApp() {

    var self = this;

    self.setupGlobbedFiles = function() {
        config.getGlobbedFiles('./app/*/models/**/*.js').forEach(function(modelPath) {
            require(path.resolve(modelPath));
        });
    };

    self.setupVariables = function() {
        self.port = config.port;
    };

    self.terminator = function(sig) {
        if (typeof sig === 'string') {
            console.log('%s: Received %s - terminating Bookmark app ...', Date(Date.now()), sig);
            process.exit(1);
        }

        console.log('%s: BookmarkApp Server Stopped.', Date(Date.now()));
    };

    self.setupTerminationHandlers = function() {
        process.on('exit', function() {
            self.terminator();
        });

        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element) {
                process.on(element, function() {
                    self.terminator(element);
                });
            });
    };

    self.setupExceptionHandlers = function() {
        process.on('uncaughtException', function(err) {
            console.log(new Date().toString(), err.stack || err);
            process.kill(process.pid, 'SIGKILL');
        });
    };

    self.setupViews = function() {
        self.app.engine('server.view.html', consolidate[config.templateEngine]);
        self.app.set('view engine', 'server.view.html');
        self.app.set('views', './app/views');

        self.app.use(express.static(path.resolve('./public')));
    };

    self.setupMiddlewares = function() {
        self.app.use(bodyParser.json());
        self.app.use(bodyParser.urlencoded({
            extended: true
        }));
        self.app.use(applicationResopnse.responseMiddleware);
    };

    self.setupErrorHandler = function() {
        require(path.resolve('./app/core/middlewares/error.middleware'))(self.app);
    };

    self.initializeRouter = function() {
        self.app.all(config.routePrefix + '/*', function(req, res, next) {
            req.user = config.user;
            next();
        });

        self.app.route('/').get(function(req, res) {
            res.render('index');
        });

        config.getGlobbedFiles('./app/*/routes/**/*.route.js').forEach(function(routePath) {
            require(path.resolve(routePath))(self.router);
        });

        self.app.use(config.routePrefix + '/v' + packageJson.version, self.router);
    };

    self.initializeMongodb = function() {
        var db = access(config, 'db');
        if (!_.isUndefined(db)) {
            database = new Database(db);
            self.conn = database.connect();
        } else {
            throw new Error('DB configuration missing');
        }
    };

    self.initializeServer = function() {
        self.app = express();
        self.router = express.Router();
        self.setupMiddlewares();
        self.createServer();
        self.setupViews();
        self.setupGlobbedFiles();
        self.initializeRouter();
        self.setupErrorHandler();
    };

    self.createServer = function() {
        self.server = http.createServer(self.app);
    };

    self.initialize = function() {
        self.setupVariables();
        self.setupTerminationHandlers();
        self.setupExceptionHandlers();
        self.initializeMongodb();
        self.initializeServer();
    };

    self.start = function() {
        if (self.conn) {
            self
                .server
                .listen(self.port,
                function() {
                    console.log('%s: BookmarkApp started on %s environment %d ...',
                        Date(Date.now()), process.env.NODE_ENV, self.port);
                });

            return self.server;
        }

        // return self.server;
    };
}

module.exports = BookmarkApp;
