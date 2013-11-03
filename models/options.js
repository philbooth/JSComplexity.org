'use strict';

exports.get = getOptionsModel;

function getOptionsModel (options) {
    return [
        {
            name: 'logicalor',
            description: '<code>||</code> operator',
            set: isOptionSet(options, 'logicalor')
        },
        {
            name: 'switchcase',
            description: '<code>switch</code> statements',
            set: isOptionSet(options, 'switchcase')
        },
        {
            name: 'forin',
            description: '<code>for...in</code> loops',
            set: isOptionSet(options, 'forin')
        },
        {
            name: 'trycatch',
            description: '<code>catch</code> clauses',
            set: isOptionSet(options, 'trycatch')
        }
    ];
}

function isOptionSet(options, option) {
    if (options === option) {
        return true;
    }

    if (Array.isArray(options) && options.indexOf(option) !== -1) {
        return true;
    }

    return false;
}
