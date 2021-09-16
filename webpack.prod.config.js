const config            = require('./webpack.common.js');
const { merge }         = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(config, {
  devtool: false,
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './key.pem',
          to: 'key.pem'
        }
      ]
    })
  ]
});
