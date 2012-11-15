'use strict';

var cr = require('complexity-report'),
    settings = require('./settings'),
    partials = require('./views/partials'),
    models = {
        options: require('./models/options'),
        metrics: require('./models/metrics'),
        functions: require('./models/functions')
    };

module.exports = [
    { path: '/', method: 'get', handler: getMain },
    { path: '/', method: 'post', handler: postMain },
//  { path: '/report.json', method: 'post', handler: postWs },
    { path: '/complexity', method: 'get', handler: getComplexity },
    { path: '/about', method: 'get', handler: getAbout }
];

function getMain (request, response) {
    response.render(partials.main, {
        title: settings.title,
        options: models.options.get([ 'logicalor', 'switchcase' ]),
        nosource: true
    });
}

function postMain (request, response) {
    var report, data = {};
    
    try {
        data.title = settings.title;
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
    
    response.render(partials.main, data);
}

function postWs (request, response) {
    // TODO: Get report, create model, call reponse.jsonp()
}

function getComplexity (request, response) {
    response.render(partials.complexity, { title: 'Complexity | ' + settings.title });
}

function getAbout (request, response) {
    response.render(partials.about, { title: 'Aboout | ' + settings.title });
}
