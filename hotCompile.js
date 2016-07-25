'use strict'

process.env.NODE_ENV='development'

const fs = require("fs")
const path = require('path')
const express = require('express')
const joindir = p => path.join(__dirname, p)
const webpack = require("webpack")
const readline = require('readline')
const app = express()
const commons = ['webpack-hot-middleware/client', 'babel/polyfill', 'whatwg-fetch']

let config = require('./webpack.hot')

fs.readdir(joindir('view'),function(err, files){
   var toBuildArray = []
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
    if(toBuildString.indexOf(answer)!= -1 && !!answer){
      console.log('hot build the module:', answer);
      config.entry[answer] = [...commons, joindir('view/'+answer)]
      const compiler = webpack(config)
      app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true
      }))
      app.use(require('webpack-hot-middleware')(compiler))
      app.use(express.static(path.resolve(__dirname,'build')))
      app.listen(8090, err => {
        if (err) {
          return console.error(err)
        }

        console.info('Listening at http://localhost:8090')
      })
    }else{
      console.log('没有那个模块，请擦亮钛合金')
    }
    rl.close();
  })
})

