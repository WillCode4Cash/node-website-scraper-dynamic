'use strict';

const phantomjs_exec = require('phantomjs-prebuilt').path;
const webdriver = require('selenium-webdriver');

const customPhantom = webdriver.Capabilities.phantomjs();
customPhantom.set("phantomjs.binary.path", phantomjs_exec);

const build = function() {
    const browser = new webdriver.Builder().withCapabilities(customPhantom).build();
    browser.getWindowHandle();
    return browser;
};

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
