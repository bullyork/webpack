'use strict'
process.env.NODE_ENV='production'
const fs = require("fs")
const child_process = require('child_process');
const path = require('path')
const joindir = p => path.join(__dirname, p)

fs.readdir(joindir('view'),function(err, files){
   let toBuildArray = []
   if (err) {
       return console.error(err);
   }
   files.forEach( function (file){
       if(file != ".DS_Store"){
        const filename = file.replace(/\.jsx?/, '')
        toBuildArray.push(filename)
       }
   })
   for (let i = 0; i < toBuildArray.length; i++) {
     let buildProcess = child_process.exec('node paramCompile.js '+toBuildArray[i],(error,stdout,stderr)=>{
      if(error){
        console.log(error.stack);
        console.log('Error code: '+error.code);
        console.log('Signal received: '+error.signal);
      }
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
     })
   }
})
