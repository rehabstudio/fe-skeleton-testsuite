[![NPM version](https://badge.fury.io/js/rehab-fe-skeleton-testsuite.png)](https://badge.fury.io/js/rehab-fe-skeleton-testsuite)

# Front-end Skeleton Test Suite

## Introduction
This package is to be used in conjunction with the rehabstudio
[front-end skeleton](https://github.com/rehabstudio/fe-skeleton). It plugs
directly into the skeletons `test` task. By default, it comes ready to serve
tests via Karma as a test runner, Webpack as a bundler, Mocha as a test
framework, Chai as an assertion library and Sinon as a mocks/spies library.

## Installation
```npm install rehab-fe-skeleton-testsuite --save-dev```

## Usage
Simply call the `runTests` method of this module with your desired parameters.
It will instantiate a `karma.Server` object with your parameters and a callback
method to run once the test suite has finished running. Your callback method
will get the exit code from Karma as a parameter (`0` for success, `1` for
error). The settings you use should be based upon those found on the
[Karma configuration page](http://karma-runner.github.io/0.13/config/configuration-file.html).

```
var testSuiteWrapper = require('rehab-fe-skeleton-testsuite');

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
    console.log('Tests Complete: Callback called.', exitCode);
});
```

## Specifying different frameworks and reporters

There are framework packages already installed within this module (a list of
which you can read from the `package.json`). When specifying reporters and
frameworks as strings, know that Karma will attempt to load them from within
the `node_modules` of this module, not your own application. If you wish to
specify a different set of reporters and frameworks then specify them as actual
loaded functions rather than strings; include them as your own applications
dependencies and require them into the settings file. An example of this is
listed below, and for more detail see the
[Plugins page](http://karma-runner.github.io/0.13/config/plugins.html)
on the Karma website.

```
var testSuiteWrapper = require('rehab-fe-skeleton-testsuite');

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

    plugins: [
        // Loaded from NPM dependencies of this package.
        'karma-mocha',
        'karma-chai',
        'karma-sinon',
        'karma-phantomjs-launcher',
        'karma-junit-reporter',

        // Inlined from your own projects node dependencies.
        require('karma-webpack')
    ],

    port: 9876,

    autoWatch: false,

    singleRun: true
};

// Test call to the test suite wrapper.
testSuiteWrapper.runTests(karmaSettings, function(exitCode) {
    console.log('Tests Complete: Callback called.', exitCode);
});
```
