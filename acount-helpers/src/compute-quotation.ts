import flow from 'lodash.flow'
import isObject from 'lodash.isobject'
import cloneDeep from 'lodash.clonedeep'
import merge from 'lodash.merge'
import shortid from 'shortid'
import { Quotation, ProductConfig, Product } from '@acount/types'

import * as compute from './compute-total'
import { filterArrayWithObject } from './filter-array-with-object'

export interface Step {
  key: string
  label: string
  value?: any
}

export type Steps = Step[]

export interface DisplayQuotation extends Quotation {
  steps: Steps
}

// const STEPS: Steps = Object.freeze([
const STEPS: Steps = [
  { key: `sendAt`, label: `stepper.sent` },
  { key: `validatedAt`, label: `stepper.validated` },
  { key: `signedAt`, label: `stepper.signed` },
]

export function cloneQuotation(quotation: Quotation): Quotation {
  return cloneDeep(quotation)
}

export function steps(quotation: Quotation): DisplayQuotation {
  const steps = STEPS.map(step => {
    const value = quotation[step.key]
    return {
      value,
      key: step.key,
      label: step.label,
    }
  })
  const displayQuotation = merge(quotation, { steps })
  return displayQuotation
}

// • de-dupe defaultProduct lines
// • check _id
export function removeDefaultProducts(quotation: Quotation): Quotation {
  const defaultProduct = quotation.productConfig
  const products = quotation.products
  if (!Array.isArray(products)) return quotation
  if (!isObject(defaultProduct)) return quotation
  const cleanedProducts = filterArrayWithObject<ProductConfig, Product>({
    defaultObject: defaultProduct,
    array: products,
  })
  quotation.products = cleanedProducts
  return quotation
}

export function recomputeTotals(quotation: Quotation): Quotation {
  if (!Array.isArray(quotation.products)) return quotation
  const totals = compute.totals(quotation)
  return merge(quotation, totals)
}

// • add an empty line a the end…
//   …in case a user just type something on the blank one
export function addEmptyLine(quotation: Quotation): Quotation {
  const defaultProduct = quotation.productConfig
  const { products } = quotation
  if (!Array.isArray(products)) return quotation
  if (!isObject(defaultProduct)) return quotation
  const emptyProduct = merge({}, defaultProduct, {
    checked: true,
    description: ``,
  })
  quotation.products.push(emptyProduct)
  return quotation
}

export function ensureProductId(quotation: Quotation): Quotation {
  const { products } = quotation
  if (!Array.isArray(products)) return quotation
  quotation.products = products.map(product => {
    if (!product._id) product._id = shortid()
    return product
  })
  return quotation
}

export function computeProductsTotal(quotation: Quotation): Quotation {
  quotation.products = quotation.products.map(product => ({
    ...product,
    total: compute.productTotal(product),
  }))
  return quotation
}

export function setProductsFormPath(quotation: Quotation): Quotation {
  quotation.products = quotation.products.map((product, index) => ({
    ...product,
    path: `products[${index}]`,
  }))
  return quotation
}

const computeProducts = flow(
  removeDefaultProducts,
  recomputeTotals,
  addEmptyLine,
  ensureProductId,
  computeProductsTotal,
  setProductsFormPath,
)

export const products = flow(
  cloneQuotation,
  computeProducts,
)

export const all = flow(
  cloneQuotation,
  steps,
  computeProducts,
)
