'use strict'

const { debuglog } = require( 'util'  )
const   chalk      = require( 'chalk' )

const _logName  = `api:db`
const logName   = _logName.toUpperCase()
const log       = debuglog( _logName )
log( chalk.green(`init logging`) )

module.exports = {
  log,
  logName,
}
