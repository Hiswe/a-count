'use strict'

const Sequelize = require( 'sequelize' )

const sequelize      = require( './connection'              )
const dbGetterSetter = require( '../utils/db-getter-setter' )

const Customer = sequelize.define( `customer`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  name: {
    type:         Sequelize.STRING,
    allowNull:    false,
    validate: {
      notEmpty: true,
    },
    set:          dbGetterSetter.setNormalizedString( `name` ),
  },
  address: {
    type:         Sequelize.TEXT,
    set:          dbGetterSetter.setTrimmedString( `address` ),
  },
  isDeactivated: {
    type:         Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

module.exports = Customer
