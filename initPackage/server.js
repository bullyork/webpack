const http = require('http');

const express = require('express');
const path = require('path');

const app = express();

app.use(require('morgan')('short'));

// ************************************
// This is the real meat of the example
// ************************************
(function() {

  // Step 1: Create & configure a webpack compiler
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.hot');
  const compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
})();

// Do anything you like with the rest of your express application.

app.use(express.static(path.join(__dirname, 'src')));

if (require.main === module) {
  const server = http.createServer(app);
  server.listen(process.env.PORT || 1616, function() {
    console.log('Listening on %j', server.address());
  });
}
