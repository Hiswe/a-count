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

function normalizeDate( val ) {
  const date = moment( val, `DD-MM-YYYY` )
  return date.isValid() ? date.toDate() : null
}

const setNormalizedDate = key => function( val ) {
  this.setDataValue( key, normalizeDate(val) )
}

module.exports = {
  normalizeString,
  setNormalizedString,
  setTrimmedString,
  normalizeDate,
  setNormalizedDate,
}
