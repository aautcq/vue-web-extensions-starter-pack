const path                   = require('path');
const HtmlWebpackPlugin      = require('html-webpack-plugin');
const MiniCssExtractPlugin   = require('mini-css-extract-plugin');
const CopyWebpackPlugin      = require('copy-webpack-plugin');
const CssMinimizerPlugin     = require('css-minimizer-webpack-plugin');
const TerserPlugin           = require('terser-webpack-plugin');
const Dotenv                 = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin }    = require('vue-loader');
const updateManifest         = require('./update-manifest.js');

module.exports = {
  mode: 'production',
  entry: {
    popup: {
      import: './src/app/popup/index.js',
      filename: './popup/index.js'
    },
    background: './src/app/background/index.js',
    foreground: './src/app/foreground/index.js'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve('src')
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions : {
                includePaths: [ path.resolve(__dirname, './src/assets/stylesheets') ]
              }
            }
          }
        ]
      },
      { // must be kept at first position
        test: /\.vue$/i,
        use: 'vue-loader'
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.html$/i,
        include: /popup\/index.html$/,
        use: 'html-loader'
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        minify: (file, sourceMap) => require('uglify-js').minify(file, {
          annotations: false,
          compress: false,
          sourceMap: sourceMap ? { content: sourceMap } : null
        })
      }),
      new CssMinimizerPlugin({})
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/stylesheets/bundle.[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/app/popup/index.html',
      filename: './popup/index.html',
      chunks: ['popup']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/app/manifest.json',
          transform (content, path) {
            return updateManifest(content, process.env.NODE_ENV !== 'production');
          }
        },
        {
          from: './src/assets/images',
          to: 'assets/images'
        },
        {
          from: './src/assets/i18n/en.json',
          to: '_locales/en/messages.json'
        },
        {
          from: './src/assets/i18n/fr.json',
          to: '_locales/fr/messages.json'
        }
      ]
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV}`
    })
  ]
};