'use strict'

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
  const date = this.getDataValue( key )
  // dates can comes in array (checkbox + hidden input backup)
  // if this is the case, just take care of the last value
  if ( Array.isArray(val) ) val = val.pop()
  // when sending `true` just put the current date
  // update is done ONLY if no current date is already set
  const isTrue = val === `true`
  if (isTrue && !date) return this.setDataValue( key, new Date() )
  // TBD should be able to set a date
  // fallback
  this.setDataValue( key, date )
}

const roundToNearestQuarter = number => {
  const rounded = Math.round(number * 4) / 4
  return parseFloat(rounded.toFixed(2), 10)
}

module.exports = {
  normalizeString,
  setNormalizedString,
  getNormalizedDate,
  setNormalizedDate,
  roundToNearestQuarter,
}
