'use strict'
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
  },
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
  totalLeft: {
    type:         Sequelize.FLOAT,
    default:      -1,
  },
  totalPaid: {
    type:         Sequelize.FLOAT,
    default:      -1,
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
