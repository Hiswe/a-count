import flow from 'lodash.flow'
import crio from 'crio'
import shortid from 'shortid'

function updatePayments(invoice) {
  const payments = invoice.get(`payments`)
  if (!crio.isArray(payments)) return invoice
  const updatedPayments = payments
    .filter(payment => payment.message || payment.date || payment.amount)
    .map(payment => {
      if (!payment._id) return payment.set(`_id`, shortid())
      return payment
    })
    .push(
      crio({
        _id: shortid(),
        message: ``,
        date: ``,
        amount: 0,
      }),
    )
  return invoice.set(`payments`, updatedPayments)
}

function updatePaymentsFieldPath(invoice) {
  const payments = invoice.get(`payments`)
  if (!crio.isArray(payments)) return invoice
  const updated = payments.map((payment, index) => {
    return payment.set(`_fieldPath`, `payments[${index}]`)
  })
  return invoice.set(`payments`, updated)
}

function recomputeTotals(invoice) {
  const payments = invoice.get(`payments`)
  if (!crio.isArray(payments)) return invoice
  const total = invoice.get(`total`)
  const paid = payments.reduce(
    (acc, payment) => parseFloat(payment.amount, 10) + acc,
    0,
  )
  const left = total - paid
  return invoice.set(`totalPaid`, paid).set(`totalLeft`, left)
}

function isPaymentFieldName(inputName) {
  return /^payments\[\d+\]/.test(inputName)
}

export const all = flow(
  updatePayments,
  updatePaymentsFieldPath,
  recomputeTotals,
)
