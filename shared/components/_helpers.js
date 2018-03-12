import moment from 'moment'
import marked from 'marked'

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
export const filterObjectInArrayWith = ( filteringObject, array ) => {
  const filteringKeys = Object.keys( filteringObject )
  const result = array
    .filter( entry => {
      const isSameAsDefault = filteringKeys
        .map( key => {
          let entryVal = entry[ key ]
          const baseVal = filteringObject[ key ]
          if (typeof baseVal === 'number' ) entryVal = parseFloat( entryVal, 10 )
          return entryVal === baseVal
        })
        .reduce( (acc, curr) => acc && curr, true )
      return !isSameAsDefault
    })
  return result
}
