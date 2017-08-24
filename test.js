const scrape = require('../node-website-scraper');
const dynamicHandler = require('./index').chrome();

scrape({
    urls: ['https://www.antipenko.pp.ua/'],
    recursive: true,
    maxRecursiveDepth: 1,
    directory: 'aivus/' + new Date().getTime(),
    // urlFilter: function (url) {
    //     "use strict";
    //     if (/ua\/services/.test(url)) {
    //         console.log('123');
    //     }
    //     return true;
    // },
    httpResponseHandler: dynamicHandler
}).then(console.log).catch(console.log);
