'use strict';

var express = require('express'),
    hogan = require('hogan-express'),
    http = require('http'),
    path = require('path'),
    cr = require('complexity-report'),
    routes = require('./routes'),
    partials = require('./views/partials'),
    app = express();

initialise();

function initialise () {
    app.configure(initialiseAll);
    app.configure('development', initialiseDev);
    app.configure('production', initialiseLive);

    setRouteHandlers();

    awaitConnections();
}

function initialiseAll () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'html');
    app.set('layout', 'layout');
    app.set('partials', partials);
    app.enable('view cache');
    app.engine('html', hogan);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('stylus').middleware({
        src: path.join(__dirname, 'client'),
        dest: path.join(__dirname, 'public'),
        compress: true
    }));
    app.use(express.static(path.join(__dirname, 'public')));
}

function initialiseDev () {
    app.use(express.errorHandler());
}

function initialiseLive () {
    // TODO: Pretty 404, 500 pages
}

function setRouteHandlers () {
    var i, route;
    for (i = 0; i < routes.length; i += 1) {
        route = routes[i];
        app[route.method](route.path, route.handler);
    }
}

function awaitConnections () {
    http.createServer(app).listen(app.get('port'), function () {
        console.log('jscomplexity.org running on port ' + app.get('port'));
    });
}
