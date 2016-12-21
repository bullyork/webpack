const path = require('path');
const webpack = require('webpack');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
module.exports = {
  entry: {
    app: [
      './src/view/index.ts',
      hotMiddlewareScript,
    ],
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
    }, {
      test: /\.jsx?$/,
      loader: 'babel-loader',
    }, {
      test: /\.js$/,
      loader: 'source-map-loader',
    }],
  },
  devtool: '#source-map',
  context: __dirname,
  plugins: [
    // Webpack 1.0
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
