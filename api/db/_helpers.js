const normalizeString = string => {
  string = `${string}`
  return string.trim().toLowerCase()
}

// Don't use upsert as it didn't return an instance but only a status
// http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-upsert
// https://medium.com/@griffinmichl/async-await-with-ternary-operators-af19f374215
const updateOrCreate = Model => async function( id, params ) {
  const instance = await ( id ? this.findById(id) : new Model() )
  if ( !instance ) return null
  return instance.update( params )
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
  // update is done ONLY if no current date is already setted
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

export {
  normalizeString,
  updateOrCreate,
  setNormalizedString,
  getNormalizedDate,
  setNormalizedDate,
  roundToNearestQuarter,
}
