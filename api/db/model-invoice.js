'use strict'

'fully paid'
'partially paid'
'send'

const Sequelize = require( 'sequelize'    )
const merge     = require( 'lodash.merge' )

const config          = require( '../config'                 )
const compute         = require( '../utils/compute-products' )
const dbGetterSetter  = require( '../utils/db-getter-setter' )
const sequelize       = require( './connection'              )

const Invoice = sequelize.define( `invoice`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  reference: {
    type: new Sequelize.VIRTUAL(Sequelize.STRING, [`invoiceConfig`, `index`]),
    get:  function() {
      const { prefix, startAt, count } = this.get( `invoiceConfig` )
      const index = this.getDataValue( `index` ) || count + 1
      return `${ prefix }${ index + startAt }`
    }
  },
  name: {
    type:         Sequelize.STRING,
  },
  tax: {
    type:         Sequelize.FLOAT,
    allowNull:    false,
  },
  index: {
    type:         Sequelize.BIGINT,
    allowNull:    false,
  },
  products: {
    type:         Sequelize.ARRAY( Sequelize.JSON ),
    allowNull:    false,
    defaultValue: [],
  },
  payments: {
    type:         Sequelize.ARRAY( Sequelize.JSON ),
    allowNull:    false,
    defaultValue: [],
    set: function( payments ) {
      payments = payments
        .filter( payment => payment.date && payment.amount )
        .map( payment => {
          payment.date = dbGetterSetter.normalizeDate( payment.date )
          return payment
        })
      this.setDataValue( `payments`, payments )
    }
  },
  _total: {
    type: new Sequelize.VIRTUAL(Sequelize.JSON, [`products`]),
    get: function () {
      const products  = this.getDataValue( `products` )
      const tax       = this.getDataValue( `tax` )
      const totals    = compute.totals( products, tax )
      const payments  = this.getDataValue( `payments` )
      if ( !Array.isArray(payments) ) return totals
      const paid      = this.getDataValue( `payments` )
        .reduce( (acc, payment) => parseFloat( payment.amount, 10 ) + acc, 0 )
      const left      = totals.all - paid
      totals.paid     = paid
      totals.left     = left
      return totals
    }
  },
  // STATUS
  sendAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          dbGetterSetter.getNormalizedDate( `sendAt` ),
    set:          dbGetterSetter.setNormalizedDate( `sendAt` ),
  },
  archivedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          dbGetterSetter.getNormalizedDate( `archivedAt` ),
    set:          dbGetterSetter.setNormalizedDate( `archivedAt` ),
  },
})

module.exports = Invoice
