'use strict'

const webpack = require('webpack')
const hardDisk = require('webpack-dev-middleware-hard-disk')
const { mergeExtraConfig } = require('mpvue-packager/lib/utils')
const webpackConfig = require('./webpack.dev.conf')

const finallyWebpackConfig = mergeExtraConfig(webpackConfig)
const compiler = webpack(finallyWebpackConfig)

module.exports = hardDisk(compiler, {
  publicPath: finallyWebpackConfig.output.publicPath,
  quiet: true
})
