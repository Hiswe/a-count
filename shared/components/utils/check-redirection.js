import isNil from 'lodash.isnil'

// control if coming from a no ID model instance…
// …we update to an instance with ID
const checkKeyChange = key => (currentState, nextState) => {
  const isLoading = currentState.isLoading || nextState.isLoading
  if ( isLoading ) return false
  const currentKey = currentState[ key ]
  const nextKey    = nextState[ key ]
  const hasCurrent = !isNil( currentKey )
  const hasNext    = !isNil( nextKey )
  // want to change route if:
  // • the previous doesn't have an ID (creation)
  // • the next one has (successful creation!)
  const isNewCreation = !hasCurrent && hasNext
  const isDifferentId = hasCurrent && hasNext && currentKey !== nextKey
  return isNewCreation ? true : isDifferentId
}

export const isNewQuotation = checkKeyChange( `id` )
export const isNewCustomer  = checkKeyChange( `id` )
export const isNewInvoice   = checkKeyChange( `invoiceId` )
