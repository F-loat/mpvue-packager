require('../check-versions')()

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

module.exports = require('./webpack.dev.conf').then(webpackConfig => {
  const compiler = webpack(webpackConfig)

  const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    stats: {
      colors: true
    }
  })

  const server = new WebpackDevServer(compiler, devServerOptions)

  server.listen(webpackConfig.devServer.port)
})

