'use strict'

const program = require('commander')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const utils = require('../utils')

let extraWebpackConfig

try {
  extraWebpackConfig = require(utils.resolve(program.config))
} catch (err) {
  extraWebpackConfig = {}
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.cssSourceMap,
      usePostCSS: true
    })
  },
  devtool: config.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: 'index.html' },
      ],
    },
    hot: true,
    inline: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.host,
    hot: true,
    port: PORT || config.port,
    open: config.autoOpenBrowser,
    overlay: config.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: '',
    proxy: config.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.poll,
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.index,
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: utils.resolve('./static'),
        to: config.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
}, extraWebpackConfig)

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
