'use strict'

const normalizeString = string => {
  string = `${string}`
  return string.trim().toLowerCase()
}

// Don't use upsert as it didn't return an instance but only a status
// http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-upsert
const updateOrCreate = Model => async function( id, params ) {
  // https://medium.com/@griffinmichl/async-await-with-ternary-operators-af19f374215
  const instance = await ( id ? this.findById(id) : new Model() )
  if ( !instance ) return null
  return instance.update( params )
}

const setNormalizedString = key => function(val) {
  this.setDataValue( key, normalizeString( val ) )
}

const getNormalizedDate = key => function() {
  const date = this.getDataValue( key )
  if (!date) return ``
  return date
}

export {
  normalizeString,
  updateOrCreate,
  setNormalizedString,
  getNormalizedDate,
}
