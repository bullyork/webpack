
'use strict';
const webpack = require('webpack');
const path = require('path');

const joindir = p => path.join(__dirname, p);

module.exports = {
  devtool: 'source-map',
  entry: {
    index: joindir('src/index'),
  },
  output: {
    path: joindir('build'),
    filename: '[name].js',
  },
  externals: {
    react: 'React',
    antd: 'antd',
  },
  resolve: {
    extensions: ['', '.js', '.scss', '.ts'],
  },

  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
    }, {
      test: /\.js$/,
      loader: 'source-map-loader',
    }],
  },
};
