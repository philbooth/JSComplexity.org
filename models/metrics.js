'use strict';

exports.get = getMetricsModel;

function getMetricsModel (data) {
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
