'use strict'

require('../check-versions')()

const webpack = require('webpack')
const hardDisk = require('webpack-dev-middleware-hard-disk')
const webpackConfig = require('./webpack.dev.conf')
const { mergeExtraConfig } = require('../utils')

const finallyWebpackConfig = mergeExtraConfig(webpackConfig)
const compiler = webpack(finallyWebpackConfig)

module.exports = hardDisk(compiler, {
  publicPath: finallyWebpackConfig.output.publicPath,
  quiet: true
})
