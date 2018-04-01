'use strict'

'fully paid'
'partially paid'
'send'

const Sequelize = require( 'sequelize' )

const config = require( '../config' )
const sequelize = require( './connection' )
const h = require( './_helpers' )

const Invoice = sequelize.define( `invoice`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  reference: {
    type: new Sequelize.VIRTUAL(Sequelize.STRING, [`defaultInvoice`, `index`, `user`]),
    get:  function() {
      const { prefix, startAt } = this.get( `defaultInvoice` )
      const { quotationCount } = this.get( `user` )
      const count = this.getDataValue( `index` ) || quotationCount + 1
      return `${ prefix }${ count + startAt }`
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
  },
  _total: {
    type: new Sequelize.VIRTUAL(Sequelize.JSON, [`products`]),
    get: function () {
      const products  = this.getDataValue( `products` )
      const tax       = this.getDataValue( `tax` )
      return compute.totals( products, tax )
    }
  },
  // STATUS
  sendAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          h.getNormalizedDate( `sendAt` ),
    set:          h.setNormalizedDate( `sendAt` ),
  },
  archivedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          h.getNormalizedDate( `archivedAt` ),
    set:          h.setNormalizedDate( `archivedAt` ),
  },
  customerName: {
    type: new Sequelize.VIRTUAL(Sequelize.STRING, [`customer`]),
    get: function() {
      const customer = this.get( `customer` )
      return customer.get( `name` )
    }
  },
  // RELATION ALIASES
  defaultInvoice: {
    type:         new Sequelize.VIRTUAL(Sequelize.JSON),
    get:          function() {
      const user = this.get( `user` )
      if ( !user ) throw new Error( `“user” relation is needed for computing products` )

      const defaultInvoice = user.get( `defaultInvoice` )
      if ( !defaultInvoice ) throw new Error( `“user.defaultInvoice” relation is needed for computing reference` )

      return omit( defaultInvoice.toJSON(), [`id`, `userId`] )
    }
  },
})

module.exports = Invoice
