import test from 'ava'

import { all } from '../src/compute-quotation'
import quotation from './_quotation'

const emptyData = {}

test(`check compute all`, t => {
  // @ts-ignore
  const computed = all(quotation)
  const { productConfig } = computed
  t.is(computed.products.length, 4, `one default product has been removed`)
  t.is(computed.totalNet, 200, `total net has been computed`)
  t.is(computed.totalTax, 20, `taxes has been computed`)
  t.is(computed.total, 220, `total has been computed`)
})
