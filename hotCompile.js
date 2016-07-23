'use strict'

const fs = require("fs")
const path = require('path')
const joindir = p => path.join(__dirname, p)
const ExtractTextPlugin = require('extract-text-webpack-plugin')
let config = require('./webpack.build')
const commons = ['babel/polyfill', 'whatwg-fetch']
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const readline = require('readline')
process.env.NODE_ENV='production'

fs.readdir(joindir('view'),function(err, files){
   let toBuildArray = []
   console.log('可编译模块：')
   if (err) {
       return console.error(err);
   }
   files.forEach( function (file){
       if(file != ".DS_Store"){
        const filename = file.replace(/\.jsx?/, '')
        console.log(filename)
        toBuildArray.push(filename)
       }
   })
   const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
   rl.question('which do you want to compile? ', (answer) => {
    const toBuildString = toBuildArray.join(',')
    if(toBuildString.indexOf(answer)!= -1){
      console.log('build the module:', answer);
      config.entry[answer] = [...commons, joindir('view/'+answer)]
      config.plugins = [
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({ 
            inject: false,
            key:answer,
            filename: answer+'.html',
            template: 'template/template.html'
        })
      ]
      webpack(config, function(err, stats) {
        if (err) { console.log('webpack:build', err) }
        console.log('[webpack:build]', stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true
        }));
      });
    }else{
      console.log('没有那个模块，请擦亮钛合金')
    }
    rl.close();
  })
})

