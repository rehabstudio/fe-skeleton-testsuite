'use strict';

// Loading dependencies.
var karma = require('karma');

module.exports = {
    /**
     *  Run the test suite with the supplied settings and
     *  callback function.
     *
     *  @param {object} karmaSettings - Options for Karma.
     *  @param {function} resolveFn - Gulp async function.
     */
    runTests: function(karmaSettings, resolveFn) {
        var testServer = new karma.Server(karmaSettings, function(exitCode) {
            if (typeof(resolveFn) === 'function') {
                resolveFn(exitCode);
            } else {
                process.exit(exitCode);
            }
        });

        testServer.start();
    }
};