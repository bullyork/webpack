
'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const joindir = p => path.join(__dirname, p)

const commons = ['babel/polyfill', 'whatwg-fetch']

module.exports = {
  entry: {
    main: [...commons, joindir('view/main')]
  },

  output: {
    path: joindir('dist'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.scss']
  },

  module: {
    loaders: [{
      loader: 'babel',
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css-loader' + '!autoprefixer-loader?browsers=last 2 versions' + '!sass-loader'),
      exclude: /node_modules/,
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'url?limit=10000!img?progressive=true'
    }],
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
}
