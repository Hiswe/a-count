'use strict'

const moment = require( 'moment' )

const normalizeString = string => {
  string = `${string}`
  return string.trim().toLowerCase()
}

const setNormalizedString = key => function( val ) {
  this.setDataValue( key, normalizeString( val ) )
}

const setTrimmedString = key => function( val ) {
  val = `${val}`
  this.setDataValue( key, val.trim() )
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
  setTrimmedString,
  getNormalizedDate,
  setNormalizedDate,
}
