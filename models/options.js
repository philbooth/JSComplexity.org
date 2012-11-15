'use strict';

var check = require('check-types');

exports.get = getOptionsModel;

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
