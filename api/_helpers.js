'use strict'

const merge = require( 'lodash.merge' )

const config = require(  './config' )

const formatResponse = (payload = {}) => {
  // get an object from a sequelize instance
  // • avoid circular references when merged
  if ( typeof payload.toJSON === `function` ) payload = payload.toJSON()
  return merge({
    _version:  config.VERSION,
    _name:     config.NAME,
  }, payload)
}

module.exports = {
  formatResponse
}
