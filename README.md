# Front-end Skeleton Test Suite

## Introduction
This package is to be used in conjunction with the rehabstudio [front-end skeleton](https://github.com/rehabstudio/fe-skeleton). It plugs directly into the skeletons `test` method. By default, it comes ready to serve tests via Karma as a test runner, Mocha as a test framework, Chai as an assertion library and Sinon as a mocks/spies library.

## Installation
```npm install rehab-fe-skeleton-testsuite --save-dev```

## Usage
Simply call the `runTests` method of this module with your desired parameters. It maps directly into `karma.server.start` with your parameters and a callback method to run once the test suite has finished running. The parameters should be based upon those found directly in Karmas [configuration page](http://karma-runner.github.io/0.12/config/configuration-file.html) and for [those specific](https://github.com/karma-runner/karma/blob/master/lib/server.js#L281) to the karma.server.start method.

```
var testSuiteWrapper = require('rehab-fe-skeleton-testsuite');

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
testSuiteWrapper.runTests(karmaSettings, function() {
    console.log('Tests Complete: Callback called.');
});
```

## Specifying different frameworks and reporters

There are framework packages already installed within this module (a list of which you can read from the `package.json`). When specifying reporters and frameworks as strings, know that Karma will attempt to load them from within the `node_modules` of this module, not your own application. If you wish to specify a different set of reporters and frameworks then specify them as actual loaded functions rather than strings; include them as your own applications dependencies and require them into the settings file. An example of this is listed below, and for more detail see the [Plugins page](http://karma-runner.github.io/0.12/config/plugins.html) on the Karma website.

```
var testSuiteWrapper = require('rehab-fe-skeleton-testsuite');

// Dummy Karma settings.
var karmaSettings = {
    basePath: '',
    client: {
        mocha: {
            timeout: 8000
        }
    },
    files: [
        './tests/*.spec.js'
    ],
    frameworks: ['mocha', 'webpack', 'chai', 'sinon'],
    reporters: ['progress'],
    plugins: [
        // Loaded from NPM dependencies of this package.
        'karma-mocha',
        'karma-chai',
        'karma-sinon',
        'karma-phantomjs-launcher',
        'karma-junit-reporter',

        // Loaded from your own projects node dependencies.
        require('karma-webpack')
    ],
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
};

// Test call to the test suite wrapper.
testSuiteWrapper.runTests(karmaSettings, function() {
    console.log('Tests Complete: Callback called.');
});
```
