'use strict';

var settings = require('../settings');

exports.get = getTitle;

function getTitle (page) {
    return settings[page].label + ' | ' + settings.title;
}
