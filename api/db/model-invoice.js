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
const DefaultInvoice = require( './model-default-invoice'   )

const Invoice = sequelize.define( `invoice`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  reference: {
    type: new Sequelize.VIRTUAL(Sequelize.STRING, [`defaultInvoice`, `index`, `user`]),
    get:  function() {
      const { prefix        , startAt } = this.get( `defaultInvoice` )
      const { quotationCount          } = this.get( `user`           )
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
    get:          dbGetterSetter.getNormalizedDate( `sendAt` ),
    set:          dbGetterSetter.setNormalizedDate( `sendAt` ),
  },
  archivedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          dbGetterSetter.getNormalizedDate( `archivedAt` ),
    set:          dbGetterSetter.setNormalizedDate( `archivedAt` ),
  },
  // RELATION ALIASES
  defaultInvoice: {
    type:         new Sequelize.VIRTUAL(Sequelize.JSON),
    get:          function() {
      const user = this.get( `user` )
      if ( !user ) throw new Error( `“user” relation is needed for computing products` )

      const defaultInvoice = user.get( `defaultInvoice` )
      if ( !defaultInvoice ) throw new Error( `“user.defaultInvoice” relation is needed for computing reference` )

      return defaultInvoice.toJSON()
    }
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
        attributes: [`id`, `email`, `name`, `invoiceCount`, `currency`],
        include: [
          {
            model: DefaultInvoice,
            attributes: [`prefix`, `startAt`],
          },
        ],
      },
      {
        model: Customer,
        attributes: [`id`, `name`, `address`],
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
