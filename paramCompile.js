'use strict'
process.env.NODE_ENV='production'


console.log("进程 " + process.argv[2] + " 执行。" )

const name = process.argv[2]
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require("webpack")
const commons = ['babel/polyfill', 'whatwg-fetch']

let config = require('./webpack.build')
