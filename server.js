'use strict';

var express = require('express'),
    http = require('http'),
    path = require('path'),
    cr = require('complexity-report'),
    app = express(),
    page = fs.readFileSync('page.html', 'utf8');

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
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
    reponse.send(page);
});

app.post('/report.json', function (request, response) {
    var report;
    try {
        report = cr.run(request.body.source, {
            forin: request.body.forin || false,
            trycatch: request.body.trycatch || false,
            logicalor: !request.body.logicalor,
            switchcase: !request.body.switchcase
        });
        response.jsonp(200, report);
    } catch (error) {
        console.dir(error);
        response.jsonp(500, { error: error.message });
    }
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
