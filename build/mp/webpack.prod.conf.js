'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const config = require('../config')
const utils = require('../utils')
const baseWebpackConfig = require('./webpack.base.conf')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.productionSourceMap,
      extract: true
    })
  },
  devtool: config.productionSourceMap ? config.devtool : false,
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin()
  ]
})

if (config.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
