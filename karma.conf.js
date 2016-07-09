const _ = require('lodash');
const webpackConfig = require('./webpack.config');
const env = require('./env');

const customLaunchers = {
  SL_Chrome: {
    base: 'SauceLabs',
    platform: 'OS X 10.11',
    browserName: 'chrome',
  },
  SL_Firefox: {
    base: 'SauceLabs',
    platform: 'OS X 10.11',
    browserName: 'firefox',
  },
  SL_Edge: {
    base: 'SauceLabs',
    platform: 'Windows 10',
    browserName: 'microsoftedge',
  }
};

module.exports = config => {
  config.set({
    basePath: '.',
    frameworks: ['mocha'],
    files: [
      'src/**/*.test.js',
    ],
    exclude: [
    ],
    preprocessors: {
      'src/**/*.test.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    reporters: _.compact([
      'mocha',
      env.isCI ? 'saucelabs' : null,
    ]),
    mochaReporter: {
      output: 'autowatch',
      showDiff: true,
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: (() => {
      if (env.isCI) return Object.keys(customLaunchers);
      return [
        'Chrome',
        'Firefox',
      ];
    })(),
    customLaunchers: customLaunchers,
    sauceLabs: {
      testName: 'WebCrypto Demo',
      recordScreenshots: false,
      connectOptions: {
        port: 5757,
        logfile: 'sauce_connect.log',
      },
      public: 'public',
    },
    // captureTimeout: 120000, // Increase timeout in case connection in CI is slow
    singleRun: true,
    concurrency: Infinity,
  });
};
