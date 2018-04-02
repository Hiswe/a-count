'use strict'

const merge = require( 'lodash.merge' )

const formatResponse = ( payload = {} ) => {
  // get an object from a sequelize instance
  // • avoid circular references when merged
  if ( typeof payload.toJSON === `function` ) payload = payload.toJSON()
  const defaultResponse = {}
  // • avoid leaking password
  delete payload.password
  return merge( payload, defaultResponse )
}

module.exports = formatResponse
