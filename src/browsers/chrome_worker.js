'use strict';

const chromedriver = require('chromedriver');
const webdriver = require('selenium-webdriver');
const workerpool = require('workerpool');

const args = [];

// Add headless argument in CHROME_HEADFUL not set
if (!process.env.CHROME_HEADFUL) {
    args.push('--headless');
}

const chromeCapabilities = webdriver.Capabilities.chrome();
chromeCapabilities.set('chromeOptions', {
    'args': args
});

const build = () => {
    return new webdriver.Builder()
        .forBrowser('chrome')
        .withCapabilities(chromeCapabilities)
        .build();
};

console.log('chrome_worker');

let driver = null;

// a deliberately inefficient implementation of the fibonacci sequence
const downloadPage = (url) => {

    // const args = [];
    //
    // // Add headless argument in CHROME_HEADFUL not set
    // if (!process.env.CHROME_HEADFUL) {
    //     args.push('--headless');
    // }
    //
    // const chromeCapabilities = webdriver.Capabilities.chrome();
    // chromeCapabilities.set('chromeOptions', {
    //     'args': args
    // });
    //
    // const build = () => {
    //     return new webdriver.Builder()
    //         .forBrowser('chrome')
    //         .withCapabilities(chromeCapabilities)
    //         .build();
    // };

    if (!driver) {
        driver = build();
    }

    driver.get(url);

    return driver.getPageSource().then(function(data) {
        // driver.quit();
        return data;
    }).catch(function(error) {
        driver.quit();
        driver = null;
        throw new Error(error);
    // }).finally(function(data) {
    //     return driver.quit();
    });
};

// create a worker and register public functions
workerpool.worker({
    downloadPage: downloadPage
});
