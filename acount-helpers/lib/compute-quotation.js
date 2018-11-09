import crio from 'crio'
import flow from 'lodash.flow'
import shortid from 'shortid'

import * as compute from './compute-total'
import { filterArrayWithObject } from './filter-array-with-object'

const STEPS = crio([
  { key: `sendAt`, label: `stepper.sent` },
  { key: `validatedAt`, label: `stepper.validated` },
  { key: `signedAt`, label: `stepper.signed` },
])

export function steps(quotation) {
  const steps = STEPS.map(s => {
    const value = quotation.get(s.key)
    return {
      value,
      key: s.key,
      label: s.label,
    }
  })
  return quotation.set(`steps`, steps)
}

// • de-dupe defaultProduct lines
// • check _id for React
export function removeDefaultProducts(quotation) {
  const defaultProduct = quotation.get(`productConfig`)
  const products = quotation.get(`products`)
  if (!crio.isArray(products)) return quotation
  if (!crio.isObject(defaultProduct)) return quotation
  const cleanedProducts = filterArrayWithObject({
    defaultObject: defaultProduct,
    array: products,
  })
  return quotation.set(`products`, cleanedProducts)
}

export function recomputeTotals(quotation) {
  const products = quotation.get(`products`)
  if (!crio.isArray(products)) return quotation
  const totals = compute.totals(quotation)
  return quotation.merge(null, totals)
}

// • add an empty line a the end…
//   …in case a user just type something on the blank one
export function addEmptyLine(quotation) {
  const defaultProduct = quotation.get(`productConfig`)
  const products = quotation.get(`products`)
  if (!crio.isArray(products)) return quotation
  if (!crio.isObject(defaultProduct)) return quotation
  const emptyProduct = defaultProduct.set(`checked`, true)
  return quotation.set(`products`, products.push(emptyProduct))
}

export function ensureProductId(quotation) {
  const products = quotation.get(`products`)
  if (!crio.isArray(products)) return quotation
  const withId = products.map(product => {
    if (!product.get(`_id`)) return product.set(`_id`, shortid())
    return product
  })
  return quotation.set(`products`, withId)
}

export const products = flow(
  removeDefaultProducts,
  recomputeTotals,
  addEmptyLine,
  ensureProductId,
)

export const all = flow(
  steps,
  products,
)
