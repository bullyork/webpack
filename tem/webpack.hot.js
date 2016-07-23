
'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const joindir = p => path.join(__dirname, p)

const commons = ['webpack-hot-middleware/client', 'babel/polyfill', 'whatwg-fetch']

module.exports = {
  // devtool: 'eval',
  devtool: 'source-map',

  entry: {
    d2d: [...commons, joindir('view/d2d')],
  },

  output: {
    path: joindir('build'),
    publicPath: '/build/',
    filename: '[name].js'
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
      loader: 'url?limit=10000!img?progressive=true'
    }],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.NoErrorsPlugin(),
  ]
}
