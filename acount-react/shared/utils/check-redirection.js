import isNil from 'lodash.isnil'
import flow from 'lodash.flow'

const checkEmptyKeyFilled = key => ({ state, payload }) => {
  const isLoading = state.isLoading || payload.isLoading
  if (isLoading) return false
  const currentKey = state[key]
  const nextKey = payload[key]
  const hasCurrent = !isNil(currentKey)
  const hasNext = !isNil(nextKey)
  // want to change route if:
  // • the previous doesn't have an ID (creation)
  // • the next one has (successful creation!)
  const isNew = !hasCurrent && hasNext
  const isDifferentId = hasCurrent && hasNext && currentKey !== nextKey
  return isNew ? true : isDifferentId
}

const checkArchivedKey = ({ state, payload }) => !isNil(payload.archivedAt)

export const isNewCustomer = {
  check: checkEmptyKeyFilled(`id`),
  url: ({ state, payload }) => `/customers/${payload.id}`,
}
export const isNewQuotation = {
  check: checkEmptyKeyFilled(`id`),
  url: ({ state, payload }) => `/quotations/${payload.id}`,
}
export const isNewInvoice = {
  check: checkEmptyKeyFilled(`invoiceId`),
  url: ({ state, payload }) => `/invoices/${payload.invoiceId}`,
}
export const isArchivedQuotation = {
  check: checkArchivedKey,
  url: ({ state, payload }) => `/archives/quotations/${payload.id}`,
}
export const isArchivedInvoice = {
  check: checkArchivedKey,
  url: ({ state, payload }) => `/archives/invoices/${payload.id}`,
}

const getRedirection = ({ state, payload }) => (hasRedirect, nextRedirect) => {
  if (hasRedirect) return hasRedirect
  if (!nextRedirect.check({ state, payload })) return false
  return nextRedirect.url({ state, payload })
}

export const checkQuotation = ({ state, payload }) => {
  return [isNewQuotation, isNewInvoice, isArchivedQuotation].reduce(
    getRedirection({ state, payload }),
    false,
  )
}
export const checkInvoice = ({ state, payload }) => {
  return [isArchivedInvoice].reduce(getRedirection({ state, payload }), false)
}

export const checkCustomer = ({ state, payload }) => {
  return [isNewCustomer].reduce(getRedirection({ state, payload }), false)
}
