'use strict'

const Sequelize = require( 'sequelize' )

const sequelize = require( './connection' )
const dbHelpers = require( './_helpers' )

const defaultMention = `** Method of payment: ** 40% after acceptance of the quote
Payment of 60% in the month following delivery. * (10% Late Penalty Rate) *
** Delivery Date: ** Delivery in 1 month or less from the date of acceptance of the quote.
** To accept this quote: **
sign below with ”good for agreement“
return it
`
const DefaultQuotation = sequelize.define( `defaultQuotation`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
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
  prefix: {
    type:         Sequelize.STRING,
    defaultValue: `QO`,
    set:          dbHelpers.setNormalizedString(`prefix`),
  },
  startAt: {
    type:         Sequelize.INTEGER,
    defaultValue: 400,
    allowNull:    false,
  },
  count: {
    type:         Sequelize.BIGINT,
    defaultValue: 0,
    allowNull:    false,
  },
  mentions: {
    type:         Sequelize.TEXT,
    defaultValue: defaultMention,
    set:          dbHelpers.setNormalizedString(`mentions`),
  },
}, { timestamps: false })

module.exports = DefaultQuotation
