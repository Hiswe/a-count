'use strict'

const { normalizeDate } = require( './db-getter-setter'         )
const   compute         = require( './compute-products'         )
const   filterArray     = require( './filter-array-with-object' )

module.exports = cleanPayments

const defaultObject = Object.freeze({
  date:   null,
  amount: 0,
})

function computeAmount( acc, payment ) {
  return parseFloat(payment.amount, 10) + acc
}

function cleanDates( payment ) {
  payment.date = normalizeDate( payment.date )
    return payment
}

function cleanPayments( params ) {
  const { tax, payments = [], total } = params
  const filtered = filterArray({
    defaultObject,
    array: payments.map( cleanDates ),
  })
  const totalPaid = filtered.reduce( computeAmount, 0)
  const totalLeft = total - totalPaid

  return {
    filtered,
    totals: {  totalPaid, totalLeft },
  }
}

