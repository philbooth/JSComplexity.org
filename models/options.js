'use strict';

var check = require('check-types');

exports.get = getOptionsModel;

function getOptionsModel (options) {
    return [
        {
            name: 'logicalor',
            description: 'Treat <code>||</code> operator as a source of cyclomatic complexity',
            set: isOptionSet(options, 'logicalor')
        },
        {
            name: 'switchcase',
            description: 'Treat <code>switch</code> statements as a source of cylomatic complexity',
            set: isOptionSet(options, 'switchcase')
        },
        {
            name: 'forin',
            description: 'Treat <code>for...in</code> loops as a source of cylomatic complexity',
            set: isOptionSet(options, 'forin')
        },
        {
            name: 'trycatch',
            description: 'Treat <code>catch</code> clauses as a source of cylomatic complexity',
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
