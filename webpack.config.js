const path = require('path');
const webpack = require('webpack');


const buildPath = 'build/';

const config = {
  debug: true,

  devtool: 'inline-source-map',

  entry: {
    bundle: [
      path.resolve(__dirname, 'src/index.js'),
    ],
  },

  output: {
    path: path.resolve(__dirname, buildPath),
    filename: '[name].js',
    publicPath: `/${buildPath}`,
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, 'src'),
      ],
      loaders: ['babel', 'source-map'],
    }],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
};

module.exports = config;
