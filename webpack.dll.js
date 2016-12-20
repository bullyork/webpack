const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'antd',
      'react-redux',
      'react-router',
      'redux',
    ],
  },
  output: {
    path: path.join(__dirname, 'src/dist'),
    filename: '[name].dll.js',
    library: '[name]_library',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'src/dist', '[name]-manifest.json'),
      name: '[name]_library',
    }),
  ],
};
