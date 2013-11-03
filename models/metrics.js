'use strict';

exports.get = getMetricsModel;

function getMetricsModel (data) {
    return [
        {
            label: 'Logical LOC',
            value: data.aggregate.sloc.logical
        },
        {
            label: 'Mean parameter count',
            value: data.aggregate.params
        },
        {
            label: 'Cyclomatic complexity',
            value: data.aggregate.cyclomatic
        },
        {
            label: 'Cyclomatic complexity density',
            value: data.aggregate.cyclomaticDensity
        },
        {
            label: 'Maintainability index',
            value: data.maintainability
        }
    ];
}
