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
                value: Math.round(data.cyclomaticDensity) + '%'
            },
            {
                label: 'Halstead difficulty',
                value: Math.round(data.halstead.difficulty)
            },
            {
                label: 'Halstead volume',
                value: Math.round(data.halstead.volume)
            },
            {
                label: 'Halstead effort',
                value: Math.round(data.halstead.effort)
            }
        ]
    };
}
