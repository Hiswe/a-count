'use strict'

const squel     = require( 'squel' ).useFlavour('postgres')
const Sequelize = require( 'sequelize' )

// Sequelize make it hard to have COUNT and SUM
// • just go with some raw attributes :D

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

const OPTIONS    = { autoQuoteAliasNames: false }

const find  = {
  quotationFor: who => (
    squel.expr()
    .and( quote(`quotation.${ who }Id = ${ who }.id`) )
    .and( quote(`quotation.invoiceId IS NULL `) )
    .and( quote(`quotation.archivedAt IS NULL `) )
  ),
  invoiceFor: who => (
    squel.expr()
    .and( quote(`invoice.${ who }Id = ${ who }.id`) )
    .and( quote(`invoice.archivedAt IS NULL `) )
  )
}

const FROM       = {
  quotation:  [ `quotations`,  `quotation`],
  invoice:    [ `invoices`,    `invoice`],
}
const WHERE = {
  customer: {
    quotation:  find.quotationFor( `customer` ),
    invoice:    find.invoiceFor( `customer` ),
  },
  user: {
    quotation:  find.quotationFor( `user` ),
    invoice:    find.invoiceFor( `user` ),
  }
}

function getCountAndSums( where ) {
  const queries = [
    [`quotation`, `count`    ],
    [`quotation`, `total`    ],
    [`invoice`  , `count`    ],
    [`invoice`  , `total`    ],
    [`invoice`  , `totalPaid`],
    [`invoice`  , `totalLeft`],
  ].map( field => {
    const [type, query] = field
    return [
      QUERY(
        squel.select( OPTIONS )
        .field( query === `count` ? COUNT() : SUM( ...field ) )
        .where( where[ type ] )
        .from( ...FROM[ type ] )
      ),
      AS( ...field ),
    ]
  })
  return queries
}

module.exports = {
  customer: {
    countAndTotal: getCountAndSums( WHERE.customer )
  },
  statistics: getCountAndSums( WHERE.user )
}
