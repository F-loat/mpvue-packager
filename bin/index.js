#!/usr/bin/env node

const program = require('commander')

program
  .option('-c, --config <path>', 'set webpack config path. defaults to ./webpack.conf.js')
  .option('-p, --pages <path>', 'set pages config path. defaults to ./src/pages.js')

program
  .command('dev')
  .description('run remote setup commands')
  .action(() => {
    require('../build/dev')
  })

program
  .command('build')
  .description('run remote setup commands')
  .action(() => {
    require('../build/build')
  })

program.parse(process.argv)
