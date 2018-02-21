import Sequelize from 'sequelize'

import sequelize from './db-connection'

const QuotationCount = sequelize.define( `quotation-count`, {
  count: {
    type:           Sequelize.INTEGER,
    allowNull:      false,
    primaryKey:     true,
    autoIncrement:  true,
    unique:         true,
  },
}, {
  timestamps: false,
})

export {
  QuotationCount as default,
}
