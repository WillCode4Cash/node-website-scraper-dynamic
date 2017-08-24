'use strict';

const chrome = require('./browsers/chrome');
const phantomjs = require('./browsers/phantomjs');

module.exports = {
    chrome: chrome,
    phantomjs: phantomjs,
};
