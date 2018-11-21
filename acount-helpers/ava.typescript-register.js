const tsConfig = require(`./tsconfig.json`)
const merge = require(`lodash.merge`)

const tsNodeConfig = merge(tsConfig, {
  transpileOnly: true,
})

console.log(tsNodeConfig)

require('ts-node').register(tsNodeConfig)
