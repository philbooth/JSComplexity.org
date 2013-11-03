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
                label: 'Logical LOC',
                value: data.sloc.logical
            },
            {
                label: 'Parameter count',
                value: data.params
            },
            {
                label: 'Cyclomatic complexity',
                value: data.cyclomatic
            },
            {
                label: 'Cyclomatic complexity density',
                value: data.cyclomaticDensity
            },
            {
                label: 'Halstead difficulty',
                value: data.halstead.difficulty
            },
            {
                label: 'Halstead volume',
                value: data.halstead.volume
            },
            {
                label: 'Halstead effort',
                value: data.halstead.effort
            }
        ]
    };
}
