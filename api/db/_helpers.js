'use strict'

const { debuglog } = require( 'util' )
const chalk = require( 'chalk' )
const moment = require( 'moment' )

const _logName = `api:db`
const logName = _logName.toUpperCase()
const log = debuglog( _logName )
log( chalk.green(`init logging`) )

const normalizeString = string => {
  string = `${string}`
  return string.trim().toLowerCase()
}

const setNormalizedString = key => function( val ) {
  this.setDataValue( key, normalizeString( val ) )
}

const getNormalizedDate = key => function() {
  const date = this.getDataValue( key )
  if (!date) return ``
  return date
}

const setNormalizedDate = key => function( val ) {
  const date = moment( val, `DD-MM-YYYY` )
  const value = date.isValid() ? date.toDate() : null
  this.setDataValue( key, value )
}

module.exports = {
  normalizeString,
  setNormalizedString,
  getNormalizedDate,
  setNormalizedDate,
  log,
  logName,
}
