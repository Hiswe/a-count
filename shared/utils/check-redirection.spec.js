import test from 'ava'
import crio from 'crio'

const empty   = {}
const withId  = {id: `id`}
const nullId  = {invoiceId: null}

import { isNewQuotation, isNewInvoice } from './check-redirection'

test( `no id → id`, t => {
  t.true( isNewQuotation(empty, withId), `should redirect when new id` )
})

test( `id → same id`, t => {
  t.false( isNewQuotation(withId, withId), `should not redirect on same id` )
})

test( `id → different id`, t => {
  t.true( isNewQuotation(withId, {id: `other`}), `should redirect on different id` )
})

test( `id → null id`, t => {
  t.false( isNewInvoice(empty, nullId), `should not redirect on a null id` )
})
