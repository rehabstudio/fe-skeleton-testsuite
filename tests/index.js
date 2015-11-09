'use stict';

// Loading dependencies.
var testSuiteWrapper = require('../src/index.js');

// Dummy Karma settings.
var karmaSettings = {
    client: {
        mocha: {
            timeout: 8000
        }
    },

    frameworks: [
        'mocha',
        'chai',
        'sinon'
    ],

    files: [
        './tests/*.spec.js'
    ],

    preprocessors: {
        './tests/*.spec.js': ['webpack']
    },

    reporters: [
        'progress'
    ],

    browsers: [
        'PhantomJS'
    ],

    port: 9876,

    autoWatch: false,

    singleRun: true
};

// Test call to the test suite wrapper.
testSuiteWrapper.runTests(karmaSettings, function(exitCode) {
    console.log('Callback called.');
    console.log('Karma Exit Code:', exitCode);
});