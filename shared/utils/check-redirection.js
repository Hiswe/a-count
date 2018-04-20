import isNil from 'lodash.isnil'

// control if coming from a no ID model instance…
// …we update to an instance with ID
const checkKeyChange = key => ({next, current}) => {
  const isLoading = current.isLoading || next.isLoading
  if ( isLoading ) return false
  const currentKey = current[ key ]
  const nextKey    = next[ key ]
  const hasCurrent = !isNil( currentKey )
  const hasNext    = !isNil( nextKey )
  // want to change route if:
  // • the previous doesn't have an ID (creation)
  // • the next one has (successful creation!)
  const isNewCreation = !hasCurrent && hasNext
  const isDifferentId = hasCurrent && hasNext && currentKey !== nextKey
  return isNewCreation ? true : isDifferentId
}

const isNewQuotation = checkKeyChange( `id` )
const isNewCustomer  = checkKeyChange( `id` )
const isNewInvoice   = checkKeyChange( `invoiceId` )
const isArchived     = ({next, current}) => {
  // console.log({
  //   isLoading: isLoading({next, current}),
  //   current : current.id,
  //   next    : next.id,
  //   archived: !isNil( next.archivedAt ),
  //   same_id : current.id === next.id,
  // })
  return !isNil( next.archivedAt )
}

const newCustomer = {
  test: isNewCustomer,
  to  : next => `/customers/${ next.id }`,
}
const newQuotation = {
  test: isNewQuotation,
  to  : next => `/quotations/${ next.id }`,
}
const archivedQuotation = {
  test: isArchived,
  to  : next => `/quotations/${ next.id }/preview`,
}
const newInvoice = {
  test: isNewInvoice,
  to  : next => `/invoices/${ next.invoiceId }`
}
const archivedInvoice = {
  test: isArchived,
  to  : next => `/invoices/${ next.id }/preview`
}

const checkRedirections = datas => (hasRedirect, redirection) => {
  const { next, current, history, staticContext } = datas
  if ( hasRedirect ) return hasRedirect
  if ( !redirection.test({next, current}) ) return false
  const redirectUrl = redirection.to( next )
  // update static context for the server
  if ( staticContext ) {
    staticContext.status  = 302
    staticContext.url     = redirectUrl
  }
  return history.push( redirectUrl )
}

export const quotation = datas => [
  newQuotation,
  newInvoice,
  archivedQuotation,
].reduce( checkRedirections(datas), false )

export const invoice   = datas => [
  archivedInvoice,
].reduce( checkRedirections(datas), false )

export const customer  = datas => [
  newCustomer,
].reduce( checkRedirections(datas), false )
