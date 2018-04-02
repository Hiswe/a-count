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
const DefaultQuotation      = require( './model-default-quotation'         )
const DefaultProduct        = require( './model-default-product'           )
const DefaultInvoice        = require( './model-default-invoice'         )

const Quotation = sequelize.define( `quotation`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  reference: {
    type: new Sequelize.VIRTUAL(Sequelize.STRING, [`defaultQuotation`, `index`, `user`]),
    get:  function() {
      const { prefix, startAt } = this.get( `defaultQuotation` )
      const { quotationCount } = this.get( `user` )
      const count = this.getDataValue( `index` ) || quotationCount + 1
      return `${ prefix }${ count + startAt }`
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
      const user = this.get( `user` )
      if ( !user ) throw new Error( `“user” relation is needed for computing products` )

      const defaultQuotation = user.get( `defaultQuotation` )
      if ( !defaultQuotation ) throw new Error( `“user.defaultQuotation” relation is needed for computing products` )

      const tax = this.getDataValue( `tax` )
      return isNil( tax ) ? defaultQuotation.tax : tax
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
      if ( !Array.isArray(products) ) {
        dbLog( `[MODEL-QUOTATION]`, `products weren't an array` )
        dbLog( products )
        return this.setDataValue( `products`, [] )
      }
      const defaultProduct = this.get( `defaultProduct` )
      const filteredProducts = filterDefaultProducts( {
        defaultObject: defaultProduct,
        array: products,
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
  // RELATION ALIASES
  defaultQuotation: {
    type:         new Sequelize.VIRTUAL(Sequelize.JSON),
    get:          function() {
      const user = this.get( `user` )
      if ( !user ) throw new Error( `“user” relation is needed for computing products` )

      const defaultQuotation = user.get( `defaultQuotation` )
      if ( !defaultQuotation ) throw new Error( `“user.defaultQuotation” relation is needed for computing reference` )

      return defaultQuotation.toJSON()
    }
  },
  defaultProduct: {
    type:         new Sequelize.VIRTUAL(Sequelize.JSON),
    get:          function() {
      const user = this.get( `user` )
      if ( !user ) throw new Error( `“user” relation is needed for computing products` )

      const defaultProduct = user.get( `defaultProduct` )
      if ( !defaultProduct ) throw new Error( `“user.defaultProduct” relation is needed for computing products` )

      return defaultProduct.toJSON()
    }
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
        attributes: [`id`, `email`, `name`, `quotationCount`, `currency`],
        include: [
          {
            model: DefaultQuotation,
            attributes: [`tax`, `prefix`, `startAt`],
          },
          {
            model: DefaultProduct,
            attributes: [`description`, `quantity`, `price`],
          },
        ],
      },
      Invoice.mergeWithDefaultRelations({
        model:      Invoice,
        required:   false,
        attributes: [`id`],
      }),
      {
        model: Customer,
        attributes: [`id`, `name`, `address`],
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
