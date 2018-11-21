import test from 'ava'

import * as computeQuotation from '../src/compute-quotation'

const emptyData = {}

const { removeDefaultProducts } = computeQuotation
test(`remove default products`, t => {
  t.is(
    // @ts-ignore
    removeDefaultProducts(emptyData),
    emptyData,
    `return the same object if no necessary datas`,
  )
})

const { recomputeTotals } = computeQuotation
test(`recompute totals`, t => {
  t.is(
    // @ts-ignore
    recomputeTotals(emptyData),
    emptyData,
    `return the same object if no necessary datas`,
  )
})

const { addEmptyLine } = computeQuotation
test(`add empty line`, t => {
  t.is(
    // @ts-ignore
    addEmptyLine(emptyData),
    emptyData,
    `return the same object of no necessary datas`,
  )
})

const { ensureProductId } = computeQuotation
test(`ensure product id`, t => {
  t.is(
    // @ts-ignore
    ensureProductId(emptyData),
    emptyData,
    `return the same object if no necessary datas`,
  )
})
