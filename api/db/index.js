'use strict'

const chalk = require( 'chalk' )
const { inspect } = require( 'util' )
const { normalize, schema } = require( 'normalizr' )

const config    = require( '../config'       )
const dbLog     = require( `../utils/log-db` )
const sequelize = require( './connection'    )
// models
const User            = require( './model-user'             )
const Customer        = require( './model-customer'         )
const Quotation       = require( './model-quotation'        )
const Invoice         = require( './model-invoice'          )
const Payment         = require( './model-payment'          )
const QuotationConfig = require( './model-quotation-config' )
const InvoiceConfig   = require( './model-invoice-config'   )
const Product         = require( './model-product'   )
const ProductConfig   = require( './model-product-config'   )

//////
// RELATIONS
//////

Payment.belongsTo( Invoice )
Payment.belongsTo( Customer )

Product.belongsTo( Quotation )

Quotation.belongsTo( User )
Quotation.belongsTo( Customer )
Quotation.belongsTo( ProductConfig )
Quotation.belongsTo( QuotationConfig )
Quotation.hasOne( Invoice )
Quotation.hasMany( Product )

Invoice.belongsTo( User )
Invoice.belongsTo( Quotation )
Invoice.belongsTo( Customer )
Invoice.belongsTo( InvoiceConfig )
Invoice.hasMany( Payment )

Customer.belongsTo( User )
Customer.hasMany( Quotation )
Customer.hasMany( Invoice )
Customer.hasMany( Payment )

QuotationConfig.belongsTo( User )
InvoiceConfig.belongsTo( User )
ProductConfig.belongsTo( User )

User.hasMany( Customer )
User.hasMany( Quotation )
User.hasMany( Invoice )
User.hasOne( QuotationConfig )
User.hasOne( InvoiceConfig )
User.hasOne( ProductConfig )

//////
// SYNC DATABASE
//////

sequelize
.authenticate()
.then( () => {
  dbLog.log( chalk.green(`connection ok`) )
  return sequelize
  .sync( {force: config.db.forceSync} )
  .then( () => { dbLog.log(chalk.green(`sync is done`)) } )
  .catch( err => {
    console.log( chalk.red(`${dbLog.logName} sync FAIL`) )
    console.log( inspect(err, {colors: true}) )
  })
})
.catch( err => {
  console.log( chalk.red(`${dbLog.logName} connection FAIL`) )
  console.log( inspect(err, {colors: true}) )
  if (err.code !== `ECONNREFUSED`) return console.log(err)
  console.log( chalk.yellow(`${dbLog.logName} db is not accessible\nlaunch it for god sake`) )
})

module.exports = {
  sequelize
}
