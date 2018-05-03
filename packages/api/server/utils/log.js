'use strict'

const { debuglog } = require( 'util'  )
const   chalk      = require( 'chalk' )

const api   = debuglog( `api` )
api( chalk.green(`init logging`) )
const auth  = debuglog( `api:auth` )

module.exports = {
  api,
  auth,
}
