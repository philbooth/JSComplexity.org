'use strict';

var settings = require('../settings');

exports.get = getMenuModel;

function getMenuModel (page) {
    return function (menuitem) {
        var trimmed;

        if (!menuitem) {
            return;
        }

        trimmed = menuitem.trim();

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
    return settings[menuitem].label;
}

function getOtherMenuItem (menuitem) {
    return [
        '<a href="',
        settings[menuitem].path,
        '" class="menuitem active">',
        getLabel(menuitem),
        '</a>'
    ].join('');
}
