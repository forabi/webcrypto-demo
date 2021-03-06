const _ = require('lodash');
const webpackConfig = require('./webpack.config');
const env = require('./env');

const customLaunchers = {
  SL_Chrome_On_Windows: {
    base: 'SauceLabs',
    platform: 'Windows 10',
    browserName: 'chrome',
  },
  SL_Firefox_On_Windows: {
    base: 'SauceLabs',
    platform: 'Windows 10',
    browserName: 'firefox',
  },
  SL_Edge: {
    base: 'SauceLabs',
    platform: 'Windows 10',
    browserName: 'microsoftedge',
  },
  SL_Chrome_On_OSX: {
    base: 'SauceLabs',
    platform: 'OS X 10.11',
    browserName: 'chrome',
  },
  SL_Firefox_On_OSX: {
    base: 'SauceLabs',
    platform: 'OS X 10.11',
    browserName: 'firefox',
  },
  SL_Chrome_On_Linux: {
    base: 'SauceLabs',
    platform: 'Linux',
    browserName: 'chrome',
  },
  SL_Firefox_On_Linux: {
    base: 'SauceLabs',
    platform: 'Linux',
    browserName: 'firefox',
  },
};

module.exports = config => {
  if (env.isCI && (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY)) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
    process.exit(1);
  }
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
        tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      },
      public: 'public',
    },
    captureTimeout: 120000, // Increase timeout in case connection in CI is slow
    singleRun: true,
    concurrency: Infinity,
  });
};
