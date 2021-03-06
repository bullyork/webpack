const webpack = require('webpack');
module.exports = {
  entry: {
    app: ['whatwg-fetch', './src/view/index.ts'],
  },
  output: {
    path: __dirname + 'src/dist',
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
    }, {
      test: /\.js$/,
      loader: 'source-map-loader',
    }],
  },
  devtool: '#source-map',
  context: __dirname,
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./src/dist/vendor-manifest.json'),
    }),
  ],
};
