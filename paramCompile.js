'use strict'
process.env.NODE_ENV='production'


console.log("进程 " + process.argv[2] + " 执行。" )

const path = require('path')
const joindir = p => path.join(__dirname, p)
const name = process.argv[2]
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require("webpack")
const commons = ['babel/polyfill', 'whatwg-fetch']

let config = require('./webpack.build')

config.entry[name] = [...commons, joindir('view/'+name)]
config.plugins = [
  new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
  }),
  new ExtractTextPlugin('[name].css'),
  new HtmlWebpackPlugin({ 
      inject: false,
      key:name,
      filename: name+'.html',
      template: 'template/template.html'
  })
]

webpack(config, function(err, stats) {
  if (err) { console.log('webpack:build', err) }
  console.log('[webpack:build]', stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true
  }))
})