'use strict'

require('../check-versions')()

const webpack = require('webpack')
const hardDisk = require('webpack-dev-middleware-hard-disk')
const webpackConfig = require('./webpack.dev.conf')

const compiler = webpack(webpackConfig)

module.exports = hardDisk(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
