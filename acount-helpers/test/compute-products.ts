import test from 'ava'

import { all } from '../src/compute-quotation'
import { computeDisplayProducts } from '../src/compute-products'
import quotation from './_quotation'

test(`compute display products`, t => {
  // @ts-ignore
  const computed = computeDisplayProducts(quotation)
  const { productConfig } = computed
  t.is(computed.products.length, 4, `one default product has been removed`)
  // @ts-ignore
  const { _id, path, total, isEmptyLine, ...lastProduct } = computed.products[3]
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
  t.is(computed.products[0].total, 100, `total has been computed for products`)
  t.false(computed.products[1].isEmptyLine, `1st product isn't an empty line`)
  t.false(computed.products[0].isEmptyLine, `2nd product isn't an empty line`)
  t.false(computed.products[2].isEmptyLine, `3rd product isn't an empty line`)
  t.true(computed.products[3].isEmptyLine, `last product is an empty line`)
})
