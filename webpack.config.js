const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      'test': /\.tsx?$/,
      'use': 'ts-loader'
    }]
  },
  devServer: {
    port: 8888,
    contentBase: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  mode: 'development'
};