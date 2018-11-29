'use strict'

require('../check-versions')()

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { mergeExtraConfig } = require('../utils')

module.exports = require('./webpack.dev.conf').then(webpackConfig => {
  const finallyWebpackConfig = mergeExtraConfig(webpackConfig)
  const devServerOptions = Object.assign({}, finallyWebpackConfig.devServer, {
    stats: {
      colors: true
    }
  })

  WebpackDevServer.addDevServerEntrypoints(finallyWebpackConfig, devServerOptions)

  const compiler = webpack(finallyWebpackConfig)
  const server = new WebpackDevServer(compiler, devServerOptions)

  server.listen(finallyWebpackConfig.devServer.port)
})
