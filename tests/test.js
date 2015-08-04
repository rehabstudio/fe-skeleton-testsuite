'use stict';

// Loading dependencies.
var testSuiteWrapper = require('../src/index.js');

// Dummy Karma settings.
var karmaSettings = {
    basePath: '',
    client: {
        mocha: {
            timeout: 8000
        }
    },
    frameworks: ['mocha', 'browserify', 'chai', 'sinon'],
    files: [
        './tests/*.spec.js'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
};

// Test call to the test suite wrapper.
testSuiteWrapper.runTests(karmaSettings, function(exitCode) {
    console.log('Callback called.');
    console.log('Karma Exit Code:', exitCode);
});