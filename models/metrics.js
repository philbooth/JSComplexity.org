'use strict';

exports.get = getMetricsModel;

function getMetricsModel (data) {
    return [
        {
            label: 'Maintainability index',
            value: data.maintainability
        },
        {
            label: 'Physical LOC',
            value: data.aggregate.complexity.sloc.physical
        },
        {
            label: 'Logical LOC',
            value: data.aggregate.complexity.sloc.logical
        },
        {
            label: 'Aggregate cyclomatic complexity',
            value: data.aggregate.complexity.cyclomatic
        }
    ];
}
