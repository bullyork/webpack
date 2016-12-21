const webpack = require('webpack');
const hotMiddlewareScript
= 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./src/dist/vendor-manifest.json'),
    }),
  ],
};
