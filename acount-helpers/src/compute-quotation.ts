import flow from 'lodash.flow'
import isObject from 'lodash.isobject'
import cloneDeep from 'lodash.clonedeep'
import merge from 'lodash.merge'
import shortid from 'shortid'
import { Quotation, ProductConfig, Product } from '@acount/types'

import { Steps, DisplayQuotation, DisplayProduct } from '../types'
import * as compute from './compute-total'
import { filterArrayWithObject } from './filter-array-with-object'
import { computeDisplayProducts } from './compute-products'

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

export function recomputeTotals(quotation: DisplayQuotation): DisplayQuotation {
  if (!Array.isArray(quotation.products)) return quotation
  const totals = compute.totals(quotation)
  return merge(quotation, totals)
}

export const products = flow(
  cloneQuotation,
  computeDisplayProducts,
  recomputeTotals,
)

export const all = flow(
  cloneQuotation,
  steps,
  computeDisplayProducts,
  recomputeTotals,
)
