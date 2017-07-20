// Karma configuration
// Generated on Tue Sep 01 2015 11:00:43 GMT-0600 (CST)
'use strict';
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // Set up the log level so that console.log messages are visible.
    browserConsoleLogOptions: {level: 'log'},

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'jasmine-expect-jsx', 'chai-sinon'],

    // List of files / patterns to load in the browser; Karma is smart enough,
    // with the preprocessors, to watch the source files and serve the compiled
    // files.
    files: [
      'node_modules/keysim/dist/keysim.js',
      'jujugui/static/gui/build/app/assets/javascripts/version.js',
      'jujugui/static/gui/build/app/assets/javascripts/bind-function-pollyfill.js',
      'jujugui/static/gui/build/app/assets/javascripts/react-with-addons.js',
      'jujugui/static/gui/build/app/assets/javascripts/react-dom.js',
      'jujugui/static/gui/build/app/assets/javascripts/classnames.js',
      'jujugui/static/gui/build/app/assets/javascripts/marked.js',
      'jujugui/static/gui/build/app/assets/javascripts/clipboard.js',
      'jujugui/static/gui/build/app/assets/javascripts/react-click-outside.js',
      'jujugui/static/gui/build/app/assets/javascripts/ReactDnD.min.js',
      'jujugui/static/gui/build/app/assets/javascripts/ReactDnDHTML5Backend.min.js',
      'jujugui/static/gui/build/app/assets/javascripts/diff.js',
      'jujugui/static/gui/build/app/assets/javascripts/prism.js',
      'jujugui/static/gui/build/app/assets/javascripts/prism-languages.js',
      'jujugui/static/gui/build/app/assets/javascripts/prop-types.js',
      'jujugui/static/gui/build/app/assets/javascripts/js-macaroon.js',
      'jujugui/static/gui/build/app/utils/component-test-utils.js',

      'jujugui/static/gui/build/app/assets/javascripts/yui/yui/yui.js',
      'jujugui/static/gui/build/app/assets/javascripts/yui/loader/loader.js',

      'jujugui/static/gui/src/app/jujulib/index.js',
      'jujugui/static/gui/src/app/jujulib/charmstore.js',
      'jujugui/static/gui/src/app/jujulib/plans.js',
      'jujugui/static/gui/src/app/jujulib/payment.js',
      'jujugui/static/gui/src/app/jujulib/stripe.js',
      'jujugui/static/gui/src/app/jujulib/terms.js',
      'jujugui/static/gui/src/app/jujulib/reconnecting-websocket.js',
      'jujugui/static/gui/src/app/jujulib/urls.js',
      'jujugui/static/gui/src/app/jujulib/bundleservice.js',
      'jujugui/static/gui/src/app/jujulib/bakery.js',
      'jujugui/static/gui/src/app/jujulib/test-*.js',

      'jujugui/static/gui/src/app/state/*.js',

      'jujugui/static/gui/build/app/assets/javascripts/d3-min.js',

      'jujugui/static/gui/src/app/components/**/*.js',
      // This file needs to go before any tests as it adds a beforEach and
      // afterEach for every test so that we can ensure there are no prop type
      // errors.
      'jujugui/static/gui/src/test/required-props.js',

      'jujugui/static/gui/build/app/user/user.js',
      'jujugui/static/gui/build/app/user/test-user.js',

      'jujugui/static/gui/build/app/store/env/acl.js',
      'jujugui/static/gui/build/app/store/env/test-acl.js',

      'jujugui/static/gui/build/app/utils/jujulib-conversion-utils.js',
      'jujugui/static/gui/build/app/utils/net-utils.js',
      'jujugui/static/gui/build/app/utils/test-net-utils.js',
      'jujugui/static/gui/build/app/utils/analytics.js',
      'jujugui/static/gui/build/app/utils/test-analytics.js',
      'jujugui/static/gui/build/app/utils/statsd.js',
      'jujugui/static/gui/build/app/utils/test-statsd.js',
      'jujugui/static/gui/build/app/utils/github-ssh-keys.js',
      'jujugui/static/gui/build/app/utils/test-github-ssh-keys.js'
    ],

    // list of files to exclude
    exclude: [
      'jujugui/static/gui/build/app/components/**/*-min.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'jujugui/static/gui/src/app/components/**/*.js': ['babel'],
    },

    // set the options for the various preprocessors used
    babelPreprocessor: {
      filename: function (file) {
        return file.originalPath.replace(/gui\/src\//, 'gui/build/');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    // test results reporter to use
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],
    specReporter : {
      suppressSkipped: true
    },

    // web server and port
    hostname: '0.0.0.0',
    port: 6544,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
