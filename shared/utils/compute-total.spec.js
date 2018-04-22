import test from 'ava'
import crio from 'crio'

import {
  roundToNearestQuarter as round,
  enforceNumber,
  productTotal,
  totals,
} from './compute-total'

test( `enforce number`, t => {
  t.is( enforceNumber(25), 25, `numbers are kept` )
  t.is( enforceNumber(`25`), 25, `strings are converted to number` )
  t.is( enforceNumber(`0.25`), 0.25, `strings can be converted to float` )
  t.is( enforceNumber(`0,25`), 0, `strings float should be in the right format` )
  t.is( enforceNumber(`foo`), 0, `invalid strings are converted to 0` )
  t.is( enforceNumber(true), 0, `invalid params are converted to 0` )
})

test( `round to nearest quarter`, t => {
  t.is( round(0), 0, `0 → 0` )
  t.is( round(0.333), 0.25, `0.333 → 0.25` )
  t.is( round(0.455), 0.5, `0.45 → 0.5` )
  t.is( round(0.750001), 0.75, `0.750001 → 0.75` )
  t.is( round(1), 1, `1 → 1` )
})

const productTotalTitle = `product total`
const price = 350

test( `${productTotalTitle} – regular use case`, t => {
  t.is( productTotal({checked: true, quantity: 0, price }), 0,   `quantity: 0` )
  t.is( productTotal({checked: true, quantity: 0.5, price }), 175,   `quantity: 0.5` )
  t.is( productTotal({checked: true, quantity: 1, price }), 350, `quantity: 1` )
  t.is( productTotal({checked: true, quantity: 1.3333, price }), 466.75,   `quantity: 1.3333` )
})

test( `${productTotalTitle} – string input`, t => {
  t.is( productTotal({checked: true, quantity: `1`, price}), price, `stringed quantity` )
  t.is( productTotal({checked: true, quantity: 1, price: `350`}), price, `stringed price` )
  t.is( productTotal({checked: true, quantity: `1`, price: `350`}), price, `both stringed` )
  t.is( productTotal({checked: true, quantity: `foo`, price}), 0, `invalid string number` )
  t.is( productTotal({checked: true, quantity: 1, price: `foo`}), 0, `invalid string price` )
  t.is( productTotal({checked: true, quantity: true, price: `foo`}), 0, `both invalid` )
})

test( `${productTotalTitle} – should work with crio object`, t => {
  t.is( productTotal(crio({checked: true, quantity: 1, price})), price, `crio with number` )
  t.is( productTotal(crio({checked: true, quantity: `1`, price: `350`})), price, `crio with string` )
})

const totalsTitle = `totals`

test( `${totalsTitle} – regular use case`, t => {
  const products = crio([
    { checked: true, quantity: .5, price },
    { checked: true, quantity: 2 , price },
  ])
  const tax      = 5.5
  const result   = totals({ products, tax })
  t.is( result.totalNet, 875   , `right net amount`   )
  t.is( result.totalTax, 48.25 , `right tax amount`   )
  t.is( result.total   , 923.25, `right total amount` )
})

test( `${totalsTitle} – should handle crio objects`, t => {
  const products = crio([
    { checked: true, quantity: .5, price },
    { checked: true, quantity: 2 , price },
  ])
  const tax      = 5.5
  const result   = totals({ products, tax })
  t.is( result.totalNet, 875   , `right net amount`   )
  t.is( result.totalTax, 48.25 , `right tax amount`   )
  t.is( result.total   , 923.25, `right total amount` )
})

test( `${totalsTitle} – handle non checked products`, t => {
  const products = crio([
    { checked: true,   quantity: 1 , price },
    { checked: `true`, quantity: 1 , price },
    { checked: false,  quantity: 1 , price },
    { checked: ``,     quantity: 1 , price },
    {                  quantity: 1 , price },
  ])
  const tax      = 0
  const result   = totals({ products, tax })
  t.is( result.totalNet , 700 , `right net amount`   )
  t.is( result.totalTax , 0   , `right tax amount`   )
  t.is( result.total    , 700 , `right total amount` )
})

test( `${totalsTitle} – handle stringed tax`, t => {
  const products = crio([
    { checked: true, quantity: .5, price },
    { checked: true, quantity: 2 , price },
  ])
  const tax      = `5.5`
  const result   = totals({ products, tax })
  t.is( result.totalNet, 875   , `right net amount`   )
  t.is( result.totalTax, 48.25 , `right tax amount`   )
  t.is( result.total   , 923.25, `right total amount` )
})

test( `${totalsTitle} – handle wrong tax`, t => {
  const products = crio([
    { checked: true, quantity: .5 , price },
    { checked: true, quantity: 2  , price },
  ])
  const tax      = `foo`
  const result   = totals({ products, tax })
  t.is( result.totalNet, 875, `right net amount`   )
  t.is( result.totalTax, 0  , `tax fallback to 0`  )
  t.is( result.total   , 875, `right total amount` )
})

test( `${totalsTitle} – handle stringed products`, t => {
  const products = crio([
    {checked: true, quantity: `.5`, price            },
    {checked: true, quantity: 2   , price: `${price}`}
  ])
  const tax      = 5.5
  const result   = totals({ products, tax })
  t.is( result.totalNet, 875   , `right net amount`   )
  t.is( result.totalTax, 48.25 , `right tax amount`   )
  t.is( result.total   , 923.25, `right total amount` )
})

test( `${totalsTitle} – handle wrong stringed products`, t => {
  const products = crio([
    { checked: true, quantity: `foo`, price        },
    { checked: true, quantity: 2    , price: `bar` },
    { checked: true, quantity: 1    , price        },
  ])
  const tax = 5.5
  const result = totals({ products, tax })
  t.is( result.totalNet, 350   , `right net amount`   )
  t.is( result.totalTax, 19.25 , `right tax amount`   )
  t.is( result.total   , 369.25, `right total amount` )
})
