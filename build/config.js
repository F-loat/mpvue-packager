'use strict'

const path = require('path')
const program = require('commander')

const { MODE, NODE_ENV, PORT } = process.env;

module.exports = {
  env: {
    MODE: JSON.stringify(MODE),
    NODE_ENV: JSON.stringify(NODE_ENV)
  },
  index: path.join(process.cwd(), program.output, 'index.html'),
  assetsRoot: path.join(process.cwd(), program.output),
  assetsSubDirectory: MODE === 'mp' ? '' : 'static',
  proxyTable: {},
  host: 'localhost',
  port: PORT || program.port,
  autoOpenBrowser: !!program.open,
  errorOverlay: true,
  notifyOnErrors: true,
  poll: false,
  useEslint: true,
  showEslintErrorsInOverlay: false,
  devtool: NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : '#source-map',
  cacheBusting: true,
  cssSourceMap: true,
  productionSourceMap: false,
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  bundleAnalyzerReport: process.env.npm_config_report
}
