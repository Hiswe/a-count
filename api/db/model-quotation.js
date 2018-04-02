'use strict'

const Sequelize = require( 'sequelize'    )
const isNil     = require( 'lodash.isnil' )
const merge     = require( 'lodash.merge' )

const config                = require( '../config'                         )
const dbLog                 = require( '../utils/log-db'                   )
const compute               = require( '../utils/compute-products'         )
const dbGetterSetter        = require( '../utils/db-getter-setter'         )
const filterDefaultProducts = require( `../utils/filter-array-with-object` )
const sequelize             = require( './connection'                      )
const User                  = require( './model-user'                      )
const Customer              = require( './model-customer'                  )
const Invoice               = require( './model-invoice'                   )
const QuotationConfig       = require( './model-quotation-config'          )
const ProductConfig         = require( './model-product-config'            )
const InvoiceConfig         = require( './model-invoice-config'            )

const Quotation = sequelize.define( `quotation`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  reference: {
    type: new Sequelize.VIRTUAL(Sequelize.STRING, [`quotationConfig`, `index`]),
    get:  function() {
      const { prefix, startAt, count } = this.get( `quotationConfig` )
      const index = this.getDataValue( `index` ) || count + 1
      return `${ prefix }${ index + startAt }`
    }
  },
  name: {
    type:         Sequelize.STRING,
    set:          dbGetterSetter.setNormalizedString(`name`),
    get:          function () {
      const name = this.getDataValue( `name` )
      return name ? name : `untitled quotation`
    },
  },
  tax: {
    type:         Sequelize.FLOAT,
    allowNull:    true,
    get:          function() {
      const quotationConfig = this.get( `quotationConfig` )
      if ( !quotationConfig ) throw new Error( `“quotationConfig” relation is needed for computing products` )

      const tax = this.getDataValue( `tax` )
      return isNil( tax ) ? quotationConfig.tax : tax
    },
    set:          function( val ) {
      if ( isNil(val) || val === `` ) return this.setDataValue( `tax`, null )
      this.setDataValue( `tax`, val )
    },
  },
  index: {
    type:         Sequelize.BIGINT,
    allowNull:    false,
  },
  products: {
    type:         Sequelize.ARRAY( Sequelize.JSON ),
    allowNull:    false,
    defaultValue: [],
    set: function ( products ) {
      const productConfig = this.getDataValue( `productConfig` ).toJSON()
      const filteredProducts = filterDefaultProducts( {
        defaultObject: productConfig,
        array        : products,
      } )
      this.setDataValue( `products`, filteredProducts )
    }
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
  validatedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          dbGetterSetter.getNormalizedDate( `validatedAt` ),
    set:          dbGetterSetter.setNormalizedDate( `validatedAt` ),
  },
  signedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          dbGetterSetter.getNormalizedDate( `signedAt` ),
    set:          dbGetterSetter.setNormalizedDate( `signedAt` ),
  },
  archivedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          dbGetterSetter.getNormalizedDate( `archivedAt` ),
    set:          dbGetterSetter.setNormalizedDate( `archivedAt` ),
  },
  _hasInvoice: {
    type: new Sequelize.VIRTUAL(Sequelize.BOOLEAN, [`invoice`]),
    get: function() {
      const invoice     = this.get( `invoice` )
      return typeof invoice !== `undefined`
    },
  },
  _canBeTransformedToInvoice: {
    type: new Sequelize.VIRTUAL(Sequelize.BOOLEAN, [`sendAt`, `validatedAt`, `signedAt`, `invoice`, `products`]),
    get: function() {
      const sendAt      = this.get( `sendAt`      )
      const validatedAt = this.get( `validatedAt` )
      const signedAt    = this.get( `signedAt`    )
      const invoice     = this.get( `invoice`     )
      const products    = this.get( `products`    )
      return sendAt !== ''
        && validatedAt !== ''
        && signedAt !== ''
        && products.length
        && !invoice
    },
  },
})

//////
// MODEL METHODS
//////

Quotation.mergeWithDefaultRelations = (additionalParams = {}) => {
  return merge({
    include: [
      {
        model: User,
        attributes: [`currency`],
      },
      Invoice.mergeWithDefaultRelations({
        model:      Invoice,
        required:   false,
        attributes: [`id`],
      }),
      {
        model: ProductConfig,
        attributes: {exclude: [`id`, `userId`]},
      },
      {
        model: QuotationConfig,
        attributes: {exclude: [`id`, `userId`]},
      },
      {
        model: Customer,
        attributes: [`id`, `name`],
      }
    ]
  }, additionalParams )
}

Quotation.findOneWithRelations = async additionalParams => {
  const params = Quotation.mergeWithDefaultRelations( additionalParams )
  const quotation = await Quotation.findOne( params )
  return quotation
}

module.exports = Quotation
