const merge = require('webpack-merge')
const prodEnv = require('./prod')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
