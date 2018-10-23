import test from 'ava'
import crio from 'crio'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { IntlProvider, intlShape } from 'react-intl'

import * as computeQuotation from './compute-quotation'

const emptyData = crio({})

const { removeDefaultProducts } = computeQuotation
test(`PRODUCTS – removeDefaultProducts`, t => {
  t.is(
    removeDefaultProducts(emptyData),
    emptyData,
    `return the same object of no necessary datas`,
  )
})

const { recomputeTotals } = computeQuotation
test(`PRODUCTS – recomputeTotals`, t => {
  t.is(
    recomputeTotals(emptyData),
    emptyData,
    `return the same object of no necessary datas`,
  )
})

const { addEmptyLine } = computeQuotation
test(`PRODUCTS – addEmptyLine`, t => {
  t.is(
    addEmptyLine(emptyData),
    emptyData,
    `return the same object of no necessary datas`,
  )
})

const { ensureProductId } = computeQuotation
test(`PRODUCTS – ensureProductId`, t => {
  t.is(
    ensureProductId(emptyData),
    emptyData,
    `return the same object of no necessary datas`,
  )
})
