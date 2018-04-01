'use strict'

const Sequelize = require( 'sequelize' )
const isNil = require( 'lodash.isnil' )
const merge = require( 'lodash.merge' )
const omit = require( 'lodash.omit' )

const config = require( '../config' )
const sequelize = require( './connection' )
const compute = require( './_compute' )
const h = require( './_helpers' )
const filterDefaultProducts = require( `./_filter-array-with-object` )
const User              = require( './model-user' )
const Customer          = require( './model-customer' )
const Invoice           = require( './model-invoice' )
const DefaultQuotation  = require( './model-default-quotation' )
const DefaultProduct    = require( './model-default-product' )

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
    set:          h.setNormalizedString(`name`),
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
        h.log( `[MODEL-QUOTATION]`, `products weren't an array` )
        h.log( products )
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
    get:          h.getNormalizedDate( `sendAt` ),
    set:          h.setNormalizedDate( `sendAt` ),
  },
  validatedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          h.getNormalizedDate( `validatedAt` ),
    set:          h.setNormalizedDate( `validatedAt` ),
  },
  signedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          h.getNormalizedDate( `signedAt` ),
    set:          h.setNormalizedDate( `signedAt` ),
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
      if (!customer) return ``
      return customer.get(`name`)
    }
  },
  _hasInvoice: {
    type: new Sequelize.VIRTUAL(Sequelize.BOOLEAN, [`invoice`]),
    get: function() {
      const invoice     = this.get( `invoice`     )
      return typeof invoice !== `undefined`
    },
  },
  _canBeTransformedToInvoice: {
    type: new Sequelize.VIRTUAL(Sequelize.BOOLEAN, [`sendAt`, `validatedAt`, `signedAt`, `invoice`]),
    get: function() {
      const sendAt      = this.get( `sendAt`      )
      const validatedAt = this.get( `validatedAt` )
      const signedAt    = this.get( `signedAt`    )
      const invoice     = this.get( `invoice`     )
      console.log( {sendAt,validatedAt, signedAt, invoice})
      return sendAt !== ''
        && validatedAt !== ''
        && signedAt !== ''
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

      return omit( defaultQuotation.toJSON(), [`id`, `userId`] )
    }
  },
  defaultProduct: {
    type:         new Sequelize.VIRTUAL(Sequelize.JSON),
    get:          function() {
      const user = this.get( `user` )
      if ( !user ) throw new Error( `“user” relation is needed for computing products` )

      const defaultProduct = user.get( `defaultProduct` )
      if ( !defaultProduct ) throw new Error( `“user.defaultProduct” relation is needed for computing products` )

      return omit( defaultProduct.toJSON(), [`id`, `userId`] )
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
        attributes: {
          exclude: [`password`],
        },
        include: [
          DefaultQuotation,
          DefaultProduct,
          {
            model:    Invoice,
            required: false,
          }
        ],
      },
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
