import moment from 'moment'
import marked from 'marked'

// prevent error while passing unsupported marked data
const safeMarked = data => {
  if (typeof data !== 'string') return ''
  return marked(data)
}

function formatDate(data) {
  if (typeof data !== `string`) return ``
  const formatedDate = moment(data).format(`DD/MM/YY HH:mm:ss`)
  return formatedDate === `Invalid date` ? `` : formatedDate
}

// control if coming from a no ID model instance…
// …we update to an instance with ID
function needRedirect( currentState, nextState ) {
  const currentId = currentState.id
  const nextId = nextState.id
  const result = !currentId && nextId ? true
    : currentId === nextId
  return result
}

// {foo: `bar`} [{foo: `bar`}, {foo: `baz`}] => [{foo: `baz`}]
function filterObjectInArrayWith( filteringObject, array ) {
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

function roundToNearestQuarter( number ) {
  const rounded = Math.round(number * 4) / 4
  return parseFloat(rounded.toFixed(2), 10)
}

function computeTotals( products, tax ) {
  const rawNet = products
    .reduce( (acc, val)  => acc + val.quantity * val.price, 0)
  const totalNet = roundToNearestQuarter( rawNet )
  const totalTax = roundToNearestQuarter( totalNet * tax / 100 )
  const total = totalNet + totalTax
  const result = {
    totalNet,
    totalTax,
    total,
  }
  return result
}

export {
  safeMarked,
  formatDate,
  needRedirect,
  filterObjectInArrayWith,
  computeTotals,
}
