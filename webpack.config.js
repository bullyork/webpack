'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'app': ['./src/view/index.ts'],
  },
  output: {
    path: path.join(__dirname, 'src/dist'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
    }, {
      test: /\.jsx?$/,
      loader: 'babel-loader',
    }, {
      test: /\.js$/,
      loader: 'source-map-loader',
    }],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./src/dist/vendor-manifest.json'),
    }),
  ],
};
