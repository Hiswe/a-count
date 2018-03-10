'use strict'

const chalk = require( 'chalk' )
const merge = require( 'lodash.merge' )
const { debuglog } = require( 'util' )

const log = debuglog( `api` )

const formatResponse = ( payload = {} ) => {
  // get an object from a sequelize instance
  // • avoid circular references when merged
  if ( typeof payload.toJSON === `function` ) payload = payload.toJSON()
  const defaultResponse = {}
  return merge(payload, defaultResponse)
}

module.exports = {
  formatResponse,
  log,
}
