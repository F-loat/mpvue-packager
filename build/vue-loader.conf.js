'use strict'
const program = require('commander')
const utils = require('./utils')
const config = require('./config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.productionSourceMap
  : config.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: program.mode === 'h5' ? isProduction : true
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
