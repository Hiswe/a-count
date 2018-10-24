import merge from 'lodash.merge'
import crio from 'crio'

// {foo: `bar`} [{foo: `bar`}, {foo: `baz`}] => [{foo: `baz`}]
export const filterArrayWithObject = ( {defaultObject, array} ) => {
  if ( !crio.isArray(array) ) return crio([])
  if ( !crio.isObject(defaultObject) ) return array
  const defaultEntries = defaultObject.entries()
  const result = array
    // make sure that the object has the same keys as the comparison
    .map( entry => defaultObject.merge(null, entry) )
    // To achieve equal comparisons, cast to the same type
    .map( entry => {
      defaultEntries.forEach( ([refKey, refValue]) => {
        const type = typeof refValue
        switch (type) {
          case 'number':
            return entry = entry.set( refKey, parseFloat(entry[ refKey ], 10) )
          case 'string':
            return entry = entry.set( refKey, `${entry[ refKey ]}` )
        }
      })
      return entry
    })
    .filter( entry => {
      // check strict equivalence over all the defaultKeys
      const isSameAsDefault = defaultEntries
        .map( ([refKey, refValue]) => refValue === entry.get(refKey)  )
        .reduce( (acc, curr) => acc && curr, true )
      return !isSameAsDefault
    })
  return result
}

export default filterArrayWithObject
