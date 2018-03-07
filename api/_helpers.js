const merge = require( 'lodash.merge' )

const config = require(  './config' )

const formatResponse = (payload = {}) => {
  return merge({
    _version:  config.VERSION,
    _name:     config.NAME,
  }, payload)
}

module.exports = {
  formatResponse
}
