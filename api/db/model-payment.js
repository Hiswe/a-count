'use strict'

const Sequelize = require( 'sequelize' )

const sequelize = require( './connection' )

const Payment = sequelize.define( `payment`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  amount: {
    type:         Sequelize.FLOAT,
    allowNull:    false,
  },
})

module.exports = Payment
