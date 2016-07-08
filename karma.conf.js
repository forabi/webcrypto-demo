const webpackConfig = require('./webpack.config');

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
    reporters: ['mocha'],
    mochaReporter: {
      output: 'autowatch',
      showDiff: true,
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [
      'Chrome',
      'Firefox',
    ],
    singleRun: false,
    concurrency: Infinity,
  });
};
