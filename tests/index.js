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
        './tests/passing.spec.js'
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

// Test passing calls to the test suite wrapper.
testSuiteWrapper.runTests(karmaSettings, function(passingExitCode) {
    console.log('Callback called.');
    console.log('Karma Exit Code:', passingExitCode);
    console.log('At this stage the code should be 0');

    if (passingExitCode !== 0) {
        console.log('Test Wrapper Fail: Success exit code is incorrect!');
        process.exit(1);
    } else {
        console.log('Test Wrapper Success: Success exit code is correct.');
    }

    // Overriding the files array so it loads the failing tests.
    karmaSettings.files = [
        './tests/failing.spec.js'
    ];

    // Test failing calls to the test suite wrapper.
    testSuiteWrapper.runTests(karmaSettings, function(failingExitCode) {
        console.log('Callback called.');
        console.log('Karma Exit Code:', failingExitCode);
        console.log('At this stage the code should be something higher than zero.');

        if (failingExitCode <= 0) {
            console.log('Test Wrapper Fail: One of the exit codes was incorrect!');
            process.exit(1);
        } else {
            console.log('Test Wrapper Success: Failure exit code is correct.');
        }
    });
});