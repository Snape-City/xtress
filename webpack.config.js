const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const OUTPUT_DIR = 'dist';

module.exports = {
  entry: './react/src/index.js',
  output: {
    path: path.join(__dirname, OUTPUT_DIR),
    filename: 'bundle.js',
    // publicPath: 'dist'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  // clean-webpack-plugin removes build folder(s) before building
  // html-webpack-plugin simplifies creation of HTML files for your bundle
  plugins: [
    new CleanWebpackPlugin([OUTPUT_DIR]),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
