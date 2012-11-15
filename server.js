'use strict';

// TODO: Split everything out to separate modules.

var express = require('express'),
    hogan = require('hogan-express'),
    http = require('http'),
    path = require('path'),
    cr = require('complexity-report'),
    check = require('check-types'),
    app = express(),
    partials = {
        header: 'partials/header',
        footer: 'partials/footer',
        main: 'partials/body/main',
        source: 'partials/body/main/source',
        error: 'partials/body/main/error',
        report: 'partials/body/main/report',
        metrics: 'partials/body/main/report/metrics',
        functions: 'partials/body/main/report/functions',
        complexity: 'partials/body/complexity',
        about: 'partials/body/about'
    },
    title = 'JavaScript Complexity Report';

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
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
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
    // TODO: Error handling / pretty 404, 500 pages
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', function (request, response) {
    response.render(partials.main, {
        title: title,
        options: getOptionsModel([ 'logicalor', 'switchcase' ])
    });
});

app.post('/', function (request, response) {
    var report, models = {};
    
    try {
        models.title = title;
        models.source = request.body.source;
        models.options = getOptionsModel(request.body.options);

        report = cr.run(request.body.source, {
            forin: request.body.forin || false,
            trycatch: request.body.trycatch || false,
            logicalor: !request.body.logicalor,
            switchcase: !request.body.switchcase
        });

        models.metrics = getAggregateModel(report);
        models.functions = getFunctionsModel(report.functions);
    } catch (error) {
        // TODO: Select/highlight error code in view?
        models.error = error;
    }
    
    response.render(partials.main, models);
});

// TODO
//app.post('/report.json', function (request, response) {
//    var report = getReport(request);
//    response.jsonp(report.status, report.body);
//});

app.get('/complexity', function (request, response) {
    response.render(partials.complexity, { title: 'Complexity | ' + title });
});

app.get('/about', function (request, response) {
    response.render(partials.about, { title: 'Aboout | ' + title });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

function getOptionsModel (options) {
    return [
        {
            name: 'logicalor',
            description: 'Treat operator || as a source of cyclomatic complexity',
            set: isOptionSet(options, 'logicalor')
        },
        {
            name: 'switchcase',
            description: 'Treat switch statements as a source of cylomatic complexity',
            set: isOptionSet(options, 'switchcase')
        },
        {
            name: 'forin',
            description: 'Treat for...in loops as a source of cylomatic complexity',
            set: isOptionSet(options, 'forin')
        },
        {
            name: 'trycatch',
            description: 'Treat catch clauses as a source of cylomatic complexity',
            set: isOptionSet(options, 'trycatch')
        }
    ];
}

function isOptionSet(options, option) {
    if (options === option) {
        return true;
    }

    if (check.isArray(options) && options.indexOf(option) !== -1) {
        return true;
    }

    return false;
}

function getAggregateModel (data) {
    return [
        {
            label: 'Maintainability index',
            value: data.maintainability
        },
        {
            label: 'Physical SLOC',
            value: data.aggregate.complexity.sloc.physical
        },
        {
            label: 'Logical SLOC',
            value: data.aggregate.complexity.sloc.logical
        },
        {
            label: 'Aggregate cyclomatic complexity',
            value: data.aggregate.complexity.cyclomatic
        }
    ];
}

function getFunctionsModel (data) {
    return data.map(getFunctionModel);
}

function getFunctionModel (data) {
    return {
        name: data.name,
        metrics: [
            {
                label: 'Line No.',
                value: data.line
            },
            {
                label: 'Physical SLOC',
                value: data.complexity.sloc.physical
            },
            {
                label: 'Logical SLOC',
                value: data.complexity.sloc.logical
            },
            {
                label: 'Cyclomatic complexity',
                value: data.complexity.cyclomatic
            },
            {
                label: 'Halstead difficulty',
                value: data.complexity.halstead.difficulty
            },
            {
                label: 'Halstead volume',
                value: data.complexity.halstead.volume
            },
            {
                label: 'Halstead effort',
                value: data.complexity.halstead.effort
            }
        ]
    };
}
