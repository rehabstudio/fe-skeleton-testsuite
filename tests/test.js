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
    junitReporter: {
        outputFile: './fe-test-results.xml'
    },
    reporters: ['progress', 'junit'],
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
};

// Test call to the test suite wrapper.
testSuiteWrapper.runTests(karmaSettings, function() {
	console.log('Callback called.');
});