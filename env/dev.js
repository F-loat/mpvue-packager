var merge = require('webpack-merge')
var prodEnv = require('./prod')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
