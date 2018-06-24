import test from 'ava'
import crio from 'crio'

const empty = crio({})
const withId = crio({ id: `:id` })
const nullId = crio({ invoiceId: null })

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

test(`quotation: creation`, t => {
  const states = {
    state: empty,
    payload: withId,
  }

  t.is(
    redirection.checkQuotation(states),
    `/quotations/:id`,
    `on creation should redirect to the right quotation`,
  )
})

test(`quotation: invoice creation`, t => {
  const states = {
    state: withId,
    payload: withId.set(`invoiceId`, `:invoiceId`).set(`archivedAt`, `666`),
  }
  t.is(
    redirection.checkQuotation(states),
    `/invoices/:invoiceId`,
    `on invoice creation should redirect to the right invoice`,
  )
})

test(`quotation: archive redirection`, t => {
  const state = withId.set(`invoiceId`, `:invoiceId`).set(`archivedAt`, `666`)
  const states = {
    state: state,
    payload: state,
  }
  t.is(
    redirection.checkQuotation(states),
    `/archives/quotations/:id`,
    `archives redirection `,
  )
})
