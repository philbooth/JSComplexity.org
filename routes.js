'use strict';

var cr = require('complexity-report'),
    settings = require('./settings'),
    partials = require('./views/partials'),
    models = {
        title: require('./models/title'),
        menu: require('./models/menu'),
        options: require('./models/options'),
        metrics: require('./models/metrics'),
        functions: require('./models/functions')
    };

module.exports = [
    { path: settings.home.path, method: 'get', handler: getMain },
    { path: settings.home.path, method: 'post', handler: postMain },
    { path: settings.complexity.path, method: 'get', handler: getComplexity },
    { path: settings.about.path, method: 'get', handler: getAbout }
];

function getMain (request, response) {
    var data = getViewData('home');

    data.options = models.options.get([ 'logicalor', 'switchcase' ]);
    data.nosource = true;

    setHeaders(request, response);

    response.render(partials.main, data);
}

function getViewData (page) {
    return {
        title: models.title.get(page),
        menu: models.menu.get(page)
    };
}

function setHeaders (request, response) {
    var userAgent = request.headers['user-agent'];

    if (userAgent && userAgent.indexOf('MSIE')) {
        response.setHeader('X-UA-Compatible', 'IE=Edge,chrome=1');
    }
}

function postMain (request, response) {
    var report, data = getViewData('home');

    try {
        data.source = request.body.source;
        data.options = models.options.get(request.body.options);

        report = cr.run(request.body.source, {
            forin: request.body.forin || false,
            trycatch: request.body.trycatch || false,
            logicalor: !request.body.logicalor,
            switchcase: !request.body.switchcase
        });

        data.metrics = models.metrics.get(report);
        data.functions = models.functions.get(report.functions);
    } catch (error) {
        // TODO: Select/highlight errorneous code in view?
        console.log(error.stack);
        data.error = error;
    }

    setHeaders(request, response);
    response.render(partials.main, data);
}

function postWs (request, response) {
    // TODO: Get report, create model, call reponse.jsonp()
}

function getComplexity (request, response) {
    setHeaders(request, response);
    response.render(partials.complexity, getViewData('complexity'));
}

function getAbout (request, response) {
    setHeaders(request, response);
    response.render(partials.about, getViewData('about'));
}
