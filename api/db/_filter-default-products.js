'use strict'

const merge = require( 'lodash.merge' )

const filterObjectInArrayWith = ( {defaultObject, array} ) => {
  const defaultEntries = Object.entries( defaultObject )
  const result = array
    // make sure that the object has the same keys as the comparison
    .map( entry => merge({}, defaultObject, entry) )
    // To achieve equal comparisons, cast to the same type
    .map( entry => {
      defaultEntries.forEach( ([refKey, refValue]) => {
        const type = typeof refValue
        switch (type) {
          case 'number':
            return entry[ refKey ] = parseFloat( entry[ refKey ], 10 )
          case 'string':
            return entry[ refKey ] = `${entry[ refKey ]}`
        }
      } )
      return entry
    } )
    .filter( entry => {
      // check strict equivalence over all the defaultKeys
      const isSameAsDefault = defaultEntries
        .map( ([refKey, refValue]) => refValue === entry[ refKey ] )
        .reduce( (acc, curr) => acc && curr, true )
      return !isSameAsDefault
    })
  return result
}

module.exports = filterObjectInArrayWith
