
'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const joindir = p => path.join(__dirname, p)

const commons = ['babel/polyfill', 'whatwg-fetch']

module.exports = {
  entry: {
  },

  output: {
    path: joindir('build'),
    filename: 'js/[name].js'
  },

  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js",'.jsx', '.scss'],
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css-loader' + '!autoprefixer-loader?browsers=last 2 versions' + '!sass-loader'),
      exclude: /node_modules/,
    }, { 
      test: /\.less$/, 
      loader: "style!css?minimize&-safe&-minifyFontValues!less" 
    }, { 
      test: /\.css$/, 
      exclude: /\.useable\.css$/, 
      loader: "style!css?minimize&-safe&-minifyFontValues" 
    }, { 
      test: /.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, 
      loader: 'url?limit=8192&name=font/[name].[ext]' 
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'url?limit=10000&name=img/[name].[ext]!img?progressive=true'
    }, { 
      test: /\.json$/,
      loader:"json"
    }],
  },
  plugins: [
  ],
}
