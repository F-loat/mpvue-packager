'use strict'

require('../check-versions')()

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

module.exports = require('./webpack.dev.conf').then(webpackConfig => {
  const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    stats: {
      colors: true
    }
  })
  WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions)

  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(compiler, devServerOptions)

  server.listen(webpackConfig.devServer.port)
})
