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
        'progress',
        'junit'
    ],

    junitReporter: {
        outputDir: './test-results',
        outputFile: 'results.xml',
        useBrowserName: false
    },

    browsers: [
        'PhantomJS'
    ],

    port: 9876,

    autoWatch: false,

    singleRun: true
};

// Run Karma to build and test a webpack bundle with a 'passing' test.
testSuiteWrapper.runTests(karmaSettings, function(passingExitCode) {
    console.log('Callback called.');
    console.log('Karma Exit Code:', passingExitCode);
    console.log('At this stage the code should be 0');

    if (passingExitCode !== 0) {
        console.log('Test Wrapper: "Success" exit code NOT sent as expected!');
        process.exit(1);
    } else {
        console.log('Test Wrapper: "Success" exit code sent as expected.');
    }

    // Overriding the files array so it loads the failing tests.
    karmaSettings.files = [
        './tests/failing.spec.js'
    ];

    // Re-run Karma to build and test a webpack bundle with a 'failing' test.
    testSuiteWrapper.runTests(karmaSettings, function(failingExitCode) {
        console.log('Callback called.');
        console.log('Karma Exit Code:', failingExitCode);

        // At this stage the code should be something higher than zero.
        if (failingExitCode <= 0) {
            console.log('Test Wrapper: "Failure" code NOT sent as expected!');
            process.exit(1);
        } else {
            console.log('Test Wrapper: "Failure" exit code sent as expected.');
        }
    });
});