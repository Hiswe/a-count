import moment from 'moment'
import marked from 'marked'
import merge from 'lodash.merge'

// prevent error while passing unsupported marked data
export const safeMarked = data => {
  if (typeof data !== 'string') return ''
  return marked(data)
}

export const formatDate = data => {
  if (typeof data !== `string`) return ``
  const formatedDate = moment(data).format(`DD/MM/YY HH:mm:ss`)
  return formatedDate === `Invalid date` ? `` : formatedDate
}

// control if coming from a no ID model instance…
// …we update to an instance with ID
export const needRedirect = ( currentState, nextState )  => {
  const currentId = currentState.id
  const nextId = nextState.id
  const result = !currentId && nextId ? true
    : currentId !== nextId
  return result
}

// {foo: `bar`} [{foo: `bar`}, {foo: `baz`}] => [{foo: `baz`}]
export const filterObjectInArrayWith = ( {defaultObject, array} ) => {
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
