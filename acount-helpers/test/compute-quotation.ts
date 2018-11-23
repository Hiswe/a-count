import test from 'ava'

import {
  removeDefaultProducts,
  recomputeTotals,
  addEmptyLine,
  ensureProductId,
  all,
} from '../src/compute-quotation'
import quotation from './_quotation'

const emptyData = {}

test(`return same object if not a valid quotation`, t => {
  // @ts-ignore
  t.is(removeDefaultProducts(emptyData), emptyData, `remove default products`)
  // @ts-ignore
  t.is(recomputeTotals(emptyData), emptyData, `recompute totals`)
  // @ts-ignore
  t.is(addEmptyLine(emptyData), emptyData, `add empty line`)
  // @ts-ignore
  t.is(ensureProductId(emptyData), emptyData, `ensure product id`)
})

test(`check compute all`, t => {
  const computed = all(quotation)
  const { productConfig } = computed
  t.is(computed.products.length, 4, `one default product has been removed`)
  // @ts-ignore
  const { _id, path, total, ...lastProduct } = computed.products[3]
  t.deepEqual(
    lastProduct,
    productConfig,
    `last element is an empty default product`,
  )
  t.deepEqual(
    quotation.productConfig,
    productConfig,
    `product configuration isn't mutated`,
  )
})
