'use strict';

const workerpool = require('workerpool');
const pool = workerpool.pool(__dirname + '/chrome_worker.js', {maxWorkers: 8});

const NormalizedUrlMap = require('../../node_modules/website-scraper/lib/utils/normalized-url-map');
const pendingResources = new NormalizedUrlMap(); // Map url -> resource

process.on('SIGUSR1', function() {
    console.log(Array.from(pendingResources.keys()));
});

module.exports = (url) => {
    // return pool.exec('downloadPage', [url]);
    return new Promise((resolve, reject) => {
        pendingResources.set(url, new Date().getTime());
        return pool.exec('downloadPage', [url]).then(function (data) {
            pendingResources.delete(url);

            return resolve(data);
        }).catch(reject);
    });
};
