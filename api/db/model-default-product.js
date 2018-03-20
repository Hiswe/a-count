'use strict'

const Sequelize = require( 'sequelize' )

const sequelize = require( './connection' )
const h = require( './_helpers' )

const DefaultProduct = sequelize.define( `defaultProduct`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  description: {
    type:         Sequelize.TEXT,
    defaultValue: '',
    allowNull:    false,
    set:          h.setTrimmedString( `description` ),
  },
  quantity: {
    type:         Sequelize.FLOAT,
    defaultValue: 0,
    allowNull:    false,
  },
  price: {
    type:         Sequelize.FLOAT,
    defaultValue: 350,
    allowNull:    false,
  },
}, { timestamps: false })

module.exports = DefaultProduct



