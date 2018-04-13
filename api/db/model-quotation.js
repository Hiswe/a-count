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

const Quotation = sequelize.define( `quotation`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  reference: {
    type: new Sequelize.VIRTUAL(Sequelize.STRING, [`quotationConfig`, `index`]),
    get:  function() {
      const config = this.get( `quotationConfig` )
      if ( !config ) return `–`
      const { prefix, startAt, creationCount } = config
      const index = this.getDataValue( `index` ) || creationCount + 1
      return `${ prefix }${ index + startAt }`
    }
  },
  name: {
    type:         Sequelize.STRING,
    set:          dbGetterSetter.setNormalizedString(`name`),
  },
  tax: {
    type:         Sequelize.FLOAT,
    allowNull:    true,
    get:          function() {
      const tax = parseFloat( this.getDataValue( `tax` ), 10 )
      if ( Number.isFinite(tax) ) return tax
      const quotationConfig   = this.get( `quotationConfig` )
      if ( !quotationConfig ) return -1
      return quotationConfig.tax
    },
    set:          function( tax ) {
      if ( isNil(tax) || tax === `` ) return this.setDataValue( `tax`, null )
      this.setDataValue( `tax`, tax )
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
  },
  // TOTALS
  // • need to keep them outside a virtual
  // • this will allow us to make some queries upon them
  //   like SUM :)
  totalNet: {
    type:         Sequelize.FLOAT,
    default:      -1,
  },
  totalTax: {
    type:         Sequelize.FLOAT,
    default:      -1,
  },
  total: {
    type:         Sequelize.FLOAT,
    default:      -1,
  },
  // STATUS
  sendAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    set:          dbGetterSetter.setNormalizedDate( `sendAt` ),
  },
  validatedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    set:          dbGetterSetter.setNormalizedDate( `validatedAt` ),
  },
  signedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    set:          dbGetterSetter.setNormalizedDate( `signedAt` ),
  },
  archivedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    set:          dbGetterSetter.setNormalizedDate( `archivedAt` ),
  },
  _hasInvoice: {
    type: new Sequelize.VIRTUAL(Sequelize.BOOLEAN, [`invoice`]),
    get: function() {
      const invoice     = this.getDataValue( `invoiceId` )
      return invoice != null
    },
  },
  _canCreateInvoice: {
    type: new Sequelize.VIRTUAL(Sequelize.BOOLEAN, [`sendAt`, `validatedAt`, `signedAt`, `invoice`, `products`]),
    get: function() {
      const dateMissing = [ `sendAt`, `validatedAt`,  `signedAt` ]
        .map( infoName => this.getDataValue( infoName) )
        .some( info => info === null )
      if ( dateMissing ) return false
      const archivedAt  = this.getDataValue( `archivedAt` )
      const totalNet    = this.getDataValue( `totalNet` )
      const hasInvoice  = this.get( `_hasInvoice` )
      return !hasInvoice && !archivedAt && totalNet > 0
    },
  },
})

module.exports = Quotation
