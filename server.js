'use strict';

var express = require('express'),
    hogan = require('hogan-express'),
    http = require('http'),
    path = require('path'),
    cr = require('complexity-report'),
    app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.set('layout', 'layout');
    app.set('partials', {
        header: 'partials/header',
        footer: 'partials/footer'
    });
    app.enable('view cache');
    app.engine('html', hogan);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
    // TODO: Error handling / pretty 404, 500 pages
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', function (request, response) {
    response.render('partials/body/main');
});

app.post('/', function (request, response) {
    var report = getReport(request);
    response.render('partials/body/main', report.body);
});

app.post('/report.json', function (request, response) {
    var report = getReport(request);
    response.jsonp(report.status, report.body);
});

app.get('/complexity', function (request, response) {
    response.render('partials/body/complexity');
});

app.get('/about', function (request, response) {
    response.render('partials/body/about');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

function getReport (request) {
    try {
        return {
            status: 200,
            body: cr.run(request.body.source, {
                forin: request.body.forin || false,
                trycatch: request.body.trycatch || false,
                logicalor: !request.body.logicalor,
                switchcase: !request.body.switchcase
            })
        };
    } catch (error) {
        return {
            status: 400,
            body: {
                error: error.message
            }
        };
    }
}
