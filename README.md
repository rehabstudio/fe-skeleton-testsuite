# Front-end Skeleton Test Suite

## Introduction
This package is to be used in conjunction with the rehabstudio [front-end skeleton](https://github.com/rehabstudio/fe-skeleton). It plugs directly into the skeletons `test` method. By default, it comes ready to serve tests via Karma as a test runner, Mocha as a test framework, Chai as an assertion library and Sinon as a mocks/spies library.

## Installation
```npm install rehab-rehab-fe-skeleton-testsuite --save-dev```

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

























i.e. in your karma config file.

frameworks: ['mocha', 'browserify', 'chai', 'sinon', 'my-custom-component'],
reporters: ['progress', 'junit'],
browsers: ['PhantomJS'],
plugins: [

    // Loaded from NPM dependencies of this package.
    'karma-mocha',
    'karma-browserify',
    'karma-chai',
    'karma-sinon',
    'karma-phantomjs-launcher',
    'karma-junit-reporter',

    // Loaded relatively to your project.
    require('my-custom-component')

]


















All build tools are supplied through Node and uses Gulp as a task runner.

It is a collection of build tools, configuration files, folder structures and more. Below are some of the features provided:

- Compile and prefix style sheets from SASS.
- Bundle and uglify JavaScript source files into payloads.
- Compile template files into JavaScript.
- Lint source files to ensure standards and conformance.
- Perform testing via a test runner and test suite.
- Watch source files and trigger compilation as required.
- Optimize image assets of various formats.
- Convenience methods for building front-end style sheets and scripts.

## Cloning
There are many options available in how you use this repository to best suit your project.

You can use this repo as the basis of your own by re-pointing the origin to your own repo URL (as long as it's freshly-made and blank). Use the code below, replacing the path and branch name as necessary:

```
git remote rm origin;
git remote add origin git@path-to-your-own-repo.git;
git push origin master
```

You can also copy the files and folders of this repository into your own, excluding the `.git` folder so it doesn't overwrite your own. Be aware that this will not preserve any git history of this repo.

## Installation
The entire toolchain is node based so ensure you are using a stable version of node such as `0.10.x` or `0.12.x`. Also ensure your version of NPM is at least `2.6.x`. Once you have met these requirements, you're ready to start the overall tooling installation via the `Makefile` method below:

```
make fe-setup;
```

This will ensure the tooling dependencies are installed and that the build files are compiled and ready for usage within the browser.


#### (Optional) Docker Setup

If you have [docker installed](http://devdocs.rehabstudio.com/en/latest/tools/docker.html) you can build the skeleton's toolchain without installing node or any of the skeleton's dependencies on your local machine. This can be done simply with the following make command:

```
make docker cmd=build
```

The `cmd` variable can be any command in the makefile, for example `watch` or `lint`. The default command is `build` so running `make docker` is equivalent to above command.



## Settings and Configuration
There are a multitude of settings files included in the root of the repository.

`.editorconfig` is a configuration file for [EditorConfig](http://editorconfig.org/); a plugin / package that can be installed in most popular editors. It enforces all team members to use the same formatting settings such as spaces over tabs, line endings and so on.

`.gitignore` offers a collection of common files and folders that should be removed from source control, as well as some custom files generated by the tooling of this skeleton.

`.jshintignore` and `.jshintrc` are used in conjunction with the linting tool and can be used to customise the standards and rules which the JavaScript source code must adhere to.

`.jscsrc` is used with the style checking tool [JSCS](http://jscs.info/) to ensure that JS source files adhere to agreed coding conventions and are styled in a consistent manner.

`karma.conf.js` houses configuration for [Karma](http://karma-runner.github.io/). It can also contain settings for Mocha, Chai and Sinon.

`run/_global.js` is a global file for the build tool methods so settings can be shared across the multitude of methods. An example setting specifies the path where assets should be copied when building CSS / JS or moving imagery or fonts.

## Folder Structure
Both style sheets and scripts follow the same structure. Library files are placed in `libs`. These library files do not have to be minifed and in best practice probably shouldn't be. This is because during development, errors within them are easier to debug, and also that the build process will be minifying them anyway.

All source files are placed within `src` and are split into modular files to aid in decoupling and organisation. Build files that are the end result of compilation are placed wherever the `destPath` of global settings points to, then nested inside `css` or `js` folders respectively.

JavaScript test files are places within `js/tests` and should have the suffix `.spec.js` so they're picked up by the test runner.

Images are placed within an `img` folder and should be maintained by grouping related imagery (features, sections etc..) into sub-folders. They are copied over to `destPath` during the `build` task.

Fonts reside within `fonts` and should be grouped into individual folders per font (which house all of that fonts different file formats). They are copied over to `destPath` during the `build` task.

Build tool methods are stored within `run` to encapsulate them away from project source files. They are split into folders per method, with each folder containing different build tool files along with an additional file (`_common.js`) which is used to share settings and keep things DRY.

## Test Suite
As previously stated, test specifications should be placed into `js/tests/` with a suffix of `.spec.js`. This ensures they will be automatically picked up by Karma whenever it is run. The test specs themselves are piped through Browserify so be sure to write the spec file syntactically as you would any other JavaScript module in your project.

The testing stack is Mocha, Chai and Sinon, with Karma as the test runner. This gives you a full toolset of test frameworks, assertion libraries, spies and more. Each component of the testing stack is already loaded into the scope of the test spec so you can just their global/top-level functions automagically.

An example test spec is shown below, which loads in a contrived model and runs some tests.
```
'use strict';

// Loading dependencies.
var FeatureModel = require('../src/models/FeatureModel');

describe('The Feature model', function() {

    beforeEach(function() {
        this.testModel = new FeatureModel();
    });

    afterEach(function() {
        this.testModel = null;
    });

    it('should have defaults', function() {
        expect(this.testModel.to.have.ownProperty('defaults');
    });

});
```

## Style and Script Bundles
Because projects frequently have multiple bundled payloads of styles and scripts (often for different sections of a web application), the skeleton tasks for `scripts` and `styles` have been designed to cycle through an array of bundles and build each bundle independently.

If you want to compile CSS or JS you will need to define the relevant bundles. You can do so in the styles settings (`run/tasks/styles/_common.js`) and the scripts settings (`run/tasks/scripts/_common.js`) where you will find further instructions.

## Task Breakdown
Each of the tasks have documentation at the top of their source files and list any potential command-line arguments they can take. Below is a short description of each available task.

### `build`
Convenience method that will ensure style sheets and javascript are compiled. After this, all assets (style sheets, images, html, fonts and scripts) are copied over to the `destPath`.

### `default`
An alias for `build`.

### `watch`
A watch method that will look for changes to source files, then re-trigger compilation. Can be called by just calling the task runner, i.e. `gulp`.

### `images`
Takes site image assets and optimizes them.

### `js-style`
Analyzes JavaScript source files to ensure their coding style adheres to a particular set of conventions.

### `lint`
Examines JavaScript source files for errors and code that doesn't conform to the specified standards.

### `server`
Hosts the `dist` folder via a node webserver.

### `scripts`
Compiles source files into minified, uglified payloads.

### `styles`
Compiles SASS into CSS and autoprefixes where applicable.

### `test`
Runs the test runner and any tests within the front-end tests folder. Also outputs JUnit XML for Jenkins.
