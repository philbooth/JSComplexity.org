'use strict';

var settings = require('../settings'),
    labels = {
        home: 'Home',
        complexity: 'About complexity',
        about: 'About this site'
    };

exports.get = getMenuModel;

function getMenuModel (page) {
    return function (menuitem) {
        var trimmed = menuitem.trim();

        if (trimmed === page) {
            return getCurrentMenuItem(trimmed);
        }

        return getOtherMenuItem(trimmed);
    };
}

function getCurrentMenuItem (menuitem) {
    return [
        '<span class="menuitem current">',
        getLabel(menuitem),
        '</span>'
    ].join('');
}

function getLabel (menuitem) {
    return labels[menuitem];
}

function getOtherMenuItem (menuitem) {
    return [
        '<a href="',
        settings.paths[menuitem],
        '" class="menuitem">',
        getLabel(menuitem),
        '</a>'
    ].join('');
}
