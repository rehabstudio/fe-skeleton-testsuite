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
    preprocessors: {
        './tests/*.spec.js': ['browserify']
    },
    browserify: {
        transform: [
            [require('browserify-istanbul'), { ignore: ['**/node_modules/**', '**/bower_components/**', '**/*.spec.js'], defaultIgnore: false }]
        ],
        watch: false
    },
    coverageReporter: {
        dir: './',
        reporters: [
            { type: 'cobertura', subdir: '.', file: 'fe-coverage-results.xml' },
            { type: 'text' }
        ]
    },
    reporters: ['progress', 'coverage'],
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