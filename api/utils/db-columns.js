'use strict'

const squel     = require( 'squel' ).useFlavour('postgres')
const Sequelize = require( 'sequelize' )

// Sequelize make it hard to have COUNT and SUM
// • just go with some raw attributes :D
const OPTIONS    = { autoQuoteAliasNames: false }
const QUOTATIONS = [ `quotations`,  `quotation`]
const INVOICES   = [ `invoices`,    `invoice`]

const fieldReg = /([a-zA-Z]*)\.([a-zA-Z]*)/g
// add double quote around field names
// • quotation.customerId => "quotation"."customerId"
// • for POSTGRE to be happy
const capitalize = txt => txt.replace(/^./, txt[0].toUpperCase())
const quote      = txt => txt.replace( fieldReg, `"$1"."$2"`)
const COUNT      = () => `COUNT(*)`
const SUM        = (modelName, column) => `SUM("${modelName}"."${column}")`
const AS         = (modelName, column) => `${modelName}s${capitalize(column)}`
const QUERY      = query => Sequelize.literal( `(${query.toString()})` )

const CUSTOMER_QUOTATION = squel
  .expr( { rawNesting: true,})
  .and( quote(`quotation.customerId = customer.id`) )
  .and( quote(`quotation.invoiceId IS NULL `) )

console.log( `CUSTOMER_QUOTATION.toString()` )
console.log( CUSTOMER_QUOTATION.toString() )

const CUSTOMER_INVOICE = squel
  .expr()
  .and( quote(`invoice.customerId = customer.id`) )

const customer = {
  quotation: {
    count: [
      QUERY(
        squel.select( OPTIONS )
        .field( COUNT() )
        .where( CUSTOMER_QUOTATION )
        .from( ...QUOTATIONS )
      ),
      AS( `quotation`, `count` )
    ],
    total: [
      QUERY(
        squel.select( OPTIONS )
        .field( SUM(`quotation`, `total` ) )
        .where( CUSTOMER_QUOTATION )
        .from( ...QUOTATIONS )
      ),
      AS( `quotation`, `total` )
    ],
  },
  invoice: {
    count: [
      QUERY(
        squel.select( OPTIONS )
        .field( COUNT() )
        .where( CUSTOMER_INVOICE )
        .from( ...INVOICES )
      ),
      AS( `invoice`, `count` )
    ],
    total: [
      QUERY(
        squel.select( OPTIONS )
        .field( SUM(`invoice`, `total`) )
        .where( CUSTOMER_INVOICE )
        .from( ...INVOICES )
      ),
      AS( `invoice`, `total` )
    ],
    totalPaid: [
      QUERY(
        squel.select( OPTIONS )
        .field( SUM(`invoice`, `totalPaid` ) )
        .where( CUSTOMER_INVOICE )
        .from( ...INVOICES )
      ),
      AS( `invoice`, `totalPaid` )
    ],
    totalLeft: [
      QUERY(
        squel.select( OPTIONS )
        .field( SUM(`invoice`, `totalLeft` ) )
        .where( CUSTOMER_INVOICE )
        .from( ...INVOICES )
      ),
      AS( `invoice`, `totalLeft` )
    ],
  }
}

module.exports = {
  customer: {
    countAndTotal: [
      customer.quotation.count,
      customer.quotation.total,
      customer.invoice.count,
      customer.invoice.total,
      customer.invoice.totalPaid,
      customer.invoice.totalLeft,
    ]
  },
  user: {

  }
}
