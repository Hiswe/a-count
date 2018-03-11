'use strict'

const chalk = require( 'chalk' )
const { inspect, debuglog } = require( 'util' )
const { normalize, schema } = require( 'normalizr' )

const log = debuglog( `db` )
const sequelize = require( './connection' )
const config = require(  '../config' )
const Customer = require( './model-customer' )
const Quotation = require( './model-quotation' )
const DefaultQuotation = require( './model-default-quotation' )
const DefaultInvoice = require( './model-default-invoice' )
const DefaultProduct = require( './model-default-product' )
const User = require( './model-user' )

//////
// RELATIONS
//////

Quotation.belongsTo( Customer )
Quotation.belongsTo( User )

Customer.hasMany( Quotation )
Customer.belongsTo( User )

DefaultQuotation.belongsTo( User )
DefaultInvoice.belongsTo( User )
DefaultProduct.belongsTo( User )

User.hasMany( Customer )
User.hasMany( Quotation )
User.hasOne( DefaultQuotation )
User.hasOne( DefaultInvoice )
User.hasOne( DefaultProduct )

//////
// SYNC DATABASE
//////

sequelize
.authenticate()
.then( () => {
  log( chalk.green(`connection ok`) )
  return sequelize
  .sync( {force: config.db.forceSync} )
  .then( () => { log(chalk.green(`sync is done`)) } )
  .catch( err => {
    log( chalk.red(`sync FAIL`) )
    log( inspect(err, {colors: true}) )
  })
})
.catch( err => {
  log( chalk.red(`connection FAIL`) )
  log( inspect(err, {colors: true}) )
  dbStatus = err
  if (err.code !== `ECONNREFUSED`) return console.log(err)
  log( chalk.yellow(`db is not accessible\nlaunch it for god sake`) )
})

module.exports = {
  sequelize
}
