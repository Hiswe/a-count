import test from 'ava'
import crio from 'crio'

const empty = {}
const withId = { id: `id` }
const nullId = { invoiceId: null }

import * as redirection from './check-redirection'

test(`no id → id`, t => {
  const states = {
    state: empty,
    payload: withId,
  }
  t.true(
    redirection.isNewQuotation.check(states),
    `should redirect when new id`,
  )
})

test(`id → same id`, t => {
  const states = {
    state: withId,
    payload: withId,
  }
  t.false(
    redirection.isNewQuotation.check(states),
    `should not redirect on same id`,
  )
})

test(`id → different id`, t => {
  const states = {
    state: empty,
    payload: { id: `other` },
  }
  t.true(
    redirection.isNewQuotation.check(states),
    `should redirect on different id`,
  )
})

test(`id → null id`, t => {
  const states = {
    state: empty,
    payload: nullId,
  }
  t.false(
    redirection.isNewInvoice.check(states),
    `should not redirect on a null id`,
  )
})
