
'use strict'
const webpack = require('webpack')
const path = require('path')

const joindir = p => path.join(__dirname, p)

module.exports = {
  devtool: 'source-map',
  entry: {
    index:joindir('src/index')
  },
  output: {
    path: joindir('build'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.scss']
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
    }]
  },
}
