const config    = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(config, {
  devtool: 'inline-source-map'
});
