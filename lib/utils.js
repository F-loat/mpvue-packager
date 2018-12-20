'use strict'

const path = require('path')
const program = require('commander')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(...dir) {
  return path.join(process.cwd(), ...dir)
}

function assetsPath(_path) {
  const { assetsSubDirectory } = require('./config')

  return path.posix.join(assetsSubDirectory, _path)
}

function mergeExtraConfig(config) {
  let extraWebpackConfig

  try {
    extraWebpackConfig = require(resolve(program.config))
  } catch (err) {
    extraWebpackConfig = {}
  }

  if (typeof extraWebpackConfig === 'object') {
    return merge(config, extraWebpackConfig)
  } else if (typeof extraWebpackConfig === 'function') {
    return extraWebpackConfig(config)
  }

  return config
}

function cssLoaders(options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const px2rpxLoader = {
    loader: 'px2rpx-loader',
    options: {
      baseDpr: 1,
      rpxUnit: 0.5
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]

    if (process.env.MODE === 'mp') {
      loaders.push(px2rpxLoader)
    }

    if (options.usePostCSS) {
      loaders.push(postcssLoader)
    }

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    wxss: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
function styleLoaders(options) {
  const output = []
  const loaders = cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

const createLintingRule = config => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: resolve('src'),
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.showEslintErrorsInOverlay
  }
})

module.exports = {
  resolve,
  assetsPath,
  mergeExtraConfig,
  cssLoaders,
  styleLoaders,
  createLintingRule
}
