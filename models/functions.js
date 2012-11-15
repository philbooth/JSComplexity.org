'use strict';

exports.get = getFunctionsModel;

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
