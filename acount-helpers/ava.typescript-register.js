const tsConfig = require('./tsconfig.json')
const merge = require('lodash.merge')

const tsNodeConfig = merge(tsConfig, {
  transpileOnly: true,
})

require('ts-node').register(tsNodeConfig)
