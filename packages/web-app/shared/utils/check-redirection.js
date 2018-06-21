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

const newCustomer = {
  check: checkEmptyKeyFilled(`id`),
  url: ({ state, payload }) => `/customers/${payload.id}`,
}
const newQuotation = {
  check: checkEmptyKeyFilled(`id`),
  url: ({ state, payload }) => `/quotations/${payload.id}`,
}
const newInvoice = {
  check: checkEmptyKeyFilled(`invoiceId`),
  url: ({ state, payload }) => `/invoices/${payload.invoiceId}`,
}
const archivedQuotation = {
  check: checkArchivedKey,
  url: ({ state, payload }) => `/archives/quotations/${payload.id}`,
}
const archivedInvoice = {
  check: checkArchivedKey,
  url: ({ state, payload }) => `/archives/invoices/${payload.id}`,
}

const getRedirection = ({ state, payload }) => (hasRedirect, redirect) => {
  if (hasRedirect) return hasRedirect
  if (!redirect.check({ state, payload })) return false
  return redirect.url({ state, payload })
}

export const checkQuotation = ({ state, payload }) => {
  return [newQuotation, newInvoice, archivedQuotation].reduce(
    getRedirection({ state, payload }),
    false,
  )
}
export const checkInvoice = ({ state, payload }) => {
  return [archivedInvoice].reduce(getRedirection({ state, payload }), false)
}

export const checkCustomer = ({ state, payload }) => {
  return [newCustomer].reduce(getRedirection({ state, payload }), false)
}
