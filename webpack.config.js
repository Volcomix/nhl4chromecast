const webpack = require('webpack')
const path = require('path')

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      './index',
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
}