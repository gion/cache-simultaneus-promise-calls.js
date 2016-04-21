(function(window) {
    'use strict';

    // the object where all the promise will be temporarily cached
    var cachedPromises = {};

    function cacheSimultaneousPromiseCalls(originalFunction) {

        // if there's an unresolved promise for the provided function
        // return that one and do nothing
        if(cachedPromises[originalFunction]) {
            return cachedPromises[originalFunction];
        }

        // call the function
        // and store it's promise in our cache
        cachedPromises[originalFunction] = originalFunction();

        // remove the cache for this function once
        // it's promise gets resolved/rejected
        cachedPromises[originalFunction].finally(function() {
            cachedPromises[originalFunction] = null;
        });

        // return the newly cached promise
        return cachedPromises[originalFunction];
    }

    window.cacheSimultaneousPromiseCalls = cacheSimultaneousPromiseCalls;
})(this);
