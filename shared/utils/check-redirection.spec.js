import test from 'ava'
import crio from 'crio'

const empty   = {}
const withId  = {id: `id`}
const nullId  = {invoiceId: null}

import { isNewQuotation, isNewInvoice } from './check-redirection'

test( `no id → id`, t => {
  const states = {
    current: empty,
    next:    withId,
  }
  t.true( isNewQuotation(states), `should redirect when new id` )
})

test( `id → same id`, t => {
  const states = {
    current: withId,
    next:    withId,
  }
  t.false( isNewQuotation(states), `should not redirect on same id` )
})

test( `id → different id`, t => {
  const states = {
    current: empty,
    next:    {id: `other`},
  }
  t.true( isNewQuotation(states), `should redirect on different id` )
})

test( `id → null id`, t => {
  const states = {
    current: empty,
    next:    nullId,
  }
  t.false( isNewInvoice(states), `should not redirect on a null id` )
})
