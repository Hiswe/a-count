import path from 'path'
import test from 'ava'
import crio from 'crio'
import shortid from 'shortid'

import { all as updatePayments } from './compute-invoice'

const titleUpdatePayment = `STATIC – update payments –`
// const { updatePayments } = computeInvoice.all
test(`${titleUpdatePayment} no events`, t => {
  const formData = crio({})
  const result = updatePayments(formData)
  t.is(result, formData, `return the original formData`)
})

test(`${titleUpdatePayment} filter empty events`, t => {
  const formData = crio({ payments: [{}, {}] })
  const { payments } = updatePayments(formData)
  t.true(crio.isArray(payments), `return a crio array`)
  t.is(payments.length, 1, `crio array has one entry`)
  t.true(shortid.isValid(payments.get(`[0]._id`)), `has an id`)
  t.is(payments.get(`[0].date`), ``, `has an empty date`)
  t.is(payments.get(`[0].amount`), 0, `has an amount of 0`)
  t.is(
    payments.get(`[0]._fieldPath`),
    `payments[0]`,
    `has the right field path`,
  )
})

test(`${titleUpdatePayment} add a line if message`, t => {
  const formData = crio({
    payments: [{ message: `p`, date: ``, amount: 0 }, {}],
  })
  const { payments } = updatePayments(formData)
  t.is(payments.length, 2, `crio array has two entries`)
  t.true(shortid.isValid(payments.get(`[0]._id`)), `has an id`)
  t.is(payments.get(`[0].message`), `p`, `has the same message`)
  t.is(payments.get(`[1].message`), ``, `has an empty line`)
})

test(`${titleUpdatePayment} add a line if amount`, t => {
  const formData = crio({ payments: [{ amount: 10 }] })
  const { payments } = updatePayments(formData)
  t.is(payments.length, 2, `crio array has two entries`)
})

test(`${titleUpdatePayment} add a line if date`, t => {
  const formData = crio({ payments: [{ date: `10/10/2015` }] })
  const { payments } = updatePayments(formData)
  t.is(payments.length, 2, `crio array has two entries`)
})

// const { removeLine } = computeInvoice
// test(`STATIC – removeLine`, t => {
//   const formData = crio({
//     payments: [{ amount: 1 }, { amount: 2 }, { amount: 3 }],
//   })
//   const { payments } = removeLine({ index: 1, formData })
//   t.is(payments.length, 2, `crio array has two entries`)
//   t.is(payments.get(`[0].amount`), 1, `first row is preserved`)
//   t.is(
//     payments.get(`[0]._fieldPath`),
//     `payments[0]`,
//     `first has the right fieldPath`,
//   )
//   t.is(payments.get(`[1].amount`), 3, `last row is preserved`)
//   t.is(
//     payments.get(`[1]._fieldPath`),
//     `payments[1]`,
//     `second has the right fieldPath`,
//   )
// })
