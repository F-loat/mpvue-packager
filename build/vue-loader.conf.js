'use strict'

const utils = require('./utils')
const config = require('./config')

const { MODE, NODE_ENV } = process.env
const { productionSourceMap, cssSourceMap } = config

const isProduction = NODE_ENV === 'production'
const sourceMapEnabled = isProduction ? productionSourceMap : cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: MODE === 'h5' ? isProduction : true
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  fileExt: config.fileExt
}
