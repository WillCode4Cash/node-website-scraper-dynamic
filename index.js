'use strict';

const Promise = require('bluebird');
const getDynamicHtml = require('./src/get-dynamic-html.js');

/**
 * Makes phantom request if response contains html, returns original response body otherwise
 * @param {Object} response - response object from `request` module
 * @return {Promise} - resolved with body if success, rejected if error
 */
module.exports = (response) => {
    const contentType = response.headers['content-type'];
    const isHtml = contentType && contentType.split(';')[0] === 'text/html';
    if (isHtml) {
        return getDynamicHtml(response.request.href);
    } else {
        return Promise.resolve(response.body);
    }
};
