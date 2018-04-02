'use strict'

const Sequelize = require( 'sequelize' )

const sequelize      = require( './connection'              )
const dbGetterSetter = require( '../utils/db-getter-setter' )

const InvoiceConfig = sequelize.define( `invoiceConfig`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  count: {
    type:         Sequelize.BIGINT,
    defaultValue: 0,
    allowNull:    false,
  },
  prefix: {
    type:         Sequelize.STRING,
    defaultValue: `INV-`,
    set:          dbGetterSetter.setTrimmedString(`prefix`),
  },
  startAt: {
    type:         Sequelize.INTEGER,
    defaultValue: 800,
    allowNull:    false,
  },
  mentions: {
    type:         Sequelize.TEXT,
    defaultValue: `invoice mentions`,
    set:          dbGetterSetter.setTrimmedString(`mentions`),
  },
}, { timestamps: false })

module.exports = InvoiceConfig
