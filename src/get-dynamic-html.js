'use strict';

const fs = require('fs');
const chromedriver = require('chromedriver');
const webdriver = require('selenium-webdriver');


const chromeCapabilities = webdriver.Capabilities.chrome();
chromeCapabilities.set('chromeOptions', {
    'args': [
        // '--headless',
    ]
});

const driver = build();
module.exports = (url) => {
	return new Promise((resolve, reject) => {
        // const driver = build();
        driver.get(url);
        driver.getPageSource().then(resolve).catch(reject).finally(function() {
            // return driver.quit();
        });
	});
};

function build() {
    return new webdriver.Builder()
        .forBrowser('chrome')
        .withCapabilities(chromeCapabilities)
        .build();
}
