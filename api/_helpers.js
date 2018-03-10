'use strict'

const chalk = require( 'chalk' )
const merge = require( 'lodash.merge' )
const { debuglog } = require( 'util' )

const log = debuglog( `api` )

const formatResponse = ( payload = {}, ctx = false ) => {
  if ( !ctx ) log( chalk.yellow(`no context passed in formatResponse helper!`) )
  // get an object from a sequelize instance
  // • avoid circular references when merged
  if ( typeof payload.toJSON === `function` ) payload = payload.toJSON()
  const defaultResponse = {}
  if ( ctx && ctx.session && ctx.session.user ) {
    defaultResponse._user = ctx.session.user
  }
  return merge(payload, defaultResponse)
}

module.exports = {
  formatResponse,
  log,
}
