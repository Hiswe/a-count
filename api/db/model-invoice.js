'use strict'

'fully paid'
'partially paid'
'send'

const Sequelize = require( 'sequelize'    )
const merge     = require( 'lodash.merge' )

const config         = require( '../config'                 )
const compute        = require( '../utils/compute-products' )
const dbGetterSetter = require( '../utils/db-getter-setter' )
const sequelize      = require( './connection'              )
const User           = require( './model-user'              )
const Customer       = require( './model-customer'          )
const InvoiceConfig  = require( './model-invoice-config'    )

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

//////
// MODEL METHODS
//////

Invoice.mergeWithDefaultRelations = (additionalParams = {}) => {
  return merge({
    include: [
      {
        model: User,
        attributes: [`currency`],
      },
      {
        model: InvoiceConfig,
        attributes: {exclude: [`id`, `userId`]},
      },
      {
        model: Customer,
        attributes: [`id`, `name`],
      }
    ]
  }, additionalParams )
}

Invoice.findOneWithRelations = async additionalParams => {
  const params    = Invoice.mergeWithDefaultRelations( additionalParams )
  const instance  = await Invoice.findOne( params )
  return instance
}

module.exports = Invoice
