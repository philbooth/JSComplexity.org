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
    app.enable('view cache');
    app.locals({ layout: 'layout' });
    app.engine('html', hogan);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', function (request, response) {
    response.render('report');
});

app.post('/', function (request, response) {
    var report = getReportResponse(request);
    response.render('report', report.body);
});

app.post('/report.json', function (request, response) {
    var report = getReportResponse(request);
    response.jsonp(report.status, report.body);
});

app.get('/complexity', function (request, response) {
    response.render('complexity');
});

app.get('/about', function (request, response) {
    response.render('about');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

function getReportResponse (request) {
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
            status: 500,
            body: {
                error: error.message
            }
        };
    }
}
