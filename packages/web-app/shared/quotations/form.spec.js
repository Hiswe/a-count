import test    from 'ava'
import crio    from 'crio'
import React   from 'react'
import Enzyme  from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { IntlProvider, intlShape } from 'react-intl'

import * as QuotationForm from './form.js'

const emptyData = crio({})

const { removeDefaultProducts } = QuotationForm
test( `PRODUCTS – removeDefaultProducts`, t => {
  t.is( removeDefaultProducts(emptyData), emptyData, `return the same object of no necessary datas` )
})

const { recomputeTotals } = QuotationForm
test( `PRODUCTS – recomputeTotals`, t => {
  t.is( recomputeTotals(emptyData), emptyData, `return the same object of no necessary datas` )
})

const { addEmptyLine } = QuotationForm
test( `PRODUCTS – addEmptyLine`, t => {
  t.is( addEmptyLine(emptyData), emptyData, `return the same object of no necessary datas` )
})

const { ensureProductId } = QuotationForm
test( `PRODUCTS – ensureProductId`, t => {
  t.is( ensureProductId(emptyData), emptyData, `return the same object of no necessary datas` )
})

