'use strict';

const Promise = require('bluebird');

const createHandler = (handler) => {
    /**
     * Makes phantom request if response contains html, returns original response body otherwise
     * @param {Object} response - response object from `request` module
     * @return {Promise} - resolved with body if success, rejected if error
     */
    return (response) => {
        const contentType = response.headers['content-type'];
        const isHtml = contentType && contentType.split(';')[0] === 'text/html';
        if (isHtml) {
            return handler(response.request.href);
        } else {
            return Promise.resolve(response.body);
        }
    }
};

module.exports = {
    chrome: () => {
        const chrome = require('./src/wrapper').chrome;
        return createHandler(chrome);
    },
    phantomjs: () => {
        const phantomjs = require('./src/wrapper').phantomjs;
        return createHandler(phantomjs);
    }
};