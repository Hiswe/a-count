import test from 'ava'

import { all } from '../src/compute-quotation'
import quotation from './_quotation'
import anotherQuotation from './_another-quotation'

const emptyData = {}

test(`check compute all`, t => {
  // @ts-ignore
  const computed = all(quotation)
  t.is(computed.products.length, 4, `one default product has been removed`)
  t.is(computed.totalNet, 200, `total net has been computed`)
  t.is(computed.totalTax, 20, `taxes has been computed`)
  t.is(computed.total, 220, `total has been computed`)
})

test(`check compute all with API result`, t => {
  // @ts-ignore
  const computed = all(anotherQuotation)
  console.log(computed.products[2])
  t.true(
    computed.products[2].isEmptyLine,
    `one default product has been removed`,
  )
})
