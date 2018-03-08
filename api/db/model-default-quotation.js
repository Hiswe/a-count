const Sequelize = require( 'sequelize' )

const sequelize = require( './connection' )
const h = require( './_helpers' )

const DefaultQuotation = sequelize.define( `defaultQuotation`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  prefix: {
    type:         Sequelize.STRING,
    defaultValue: `FA`,
    set:          h.setNormalizedString(`prefix`),
  },
  startAt: {
    type:         Sequelize.INTEGER,
    defaultValue: 800,
    allowNull:    false,
  },
  count: {
    type:         Sequelize.BIGINT,
    defaultValue: 0,
    allowNull:    false,
  },
  mentions: {
    type:         Sequelize.STRING,
    defaultValue: `** Method of payment: ** 40% after acceptance of the quote \ nPayment of 60% in the month following delivery. * (10% Late Penalty Rate) * \ n ** Delivery Date: ** Delivery in 1 month or less from the date of acceptance of the quote. \ n ** To accept this quote: ** \ n- sign below with "good for agreement" \ n- return it`
  },
}, { timestamps: false })

module.exports = DefaultQuotation
