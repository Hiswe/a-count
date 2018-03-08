const Sequelize = require( 'sequelize' )

const sequelize = require( './connection' )
const h = require( './_helpers' )

const DefaultProduct = sequelize.define( `defaultProduct`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
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
  tax: {
    type:         Sequelize.FLOAT,
    defaultValue: 0,
    allowNull:    false,
  },
  currency: {
    type:         Sequelize.CHAR(2),
    defaultValue: `$`,
    validate: {
      isIn: [[`$`, `€`]],
    },
  },
}, { timestamps: false })

module.exports = DefaultProduct



