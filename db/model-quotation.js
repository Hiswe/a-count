'use strict'

import Sequelize from 'sequelize'

import sequelize from './db-connection'
import * as h from './helpers'

const Quotation = sequelize.define( `quotation`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  name: {
    type:         Sequelize.STRING,
    allowNull:    false,
    validate:     {
      notEmpty: true,
    },
    set:          h.setNormalizedString(`name`),
  },
  tax: {
    type:         Sequelize.FLOAT,
    defaultValue: 0,
    allowNull:    false,
  },
  sendAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
  },
  sendAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
  },
  validatedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
  },
  signedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
  },
  archivedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
  },
  products: {
    type:         Sequelize.ARRAY( Sequelize.JSON ),
    allowNull:    false,
    defaultValue: [{description: ``, quantity: 0, price: 350}]
  },
})

Quotation.updateOrCreate = h.updateOrCreate( Quotation )

export {
  Quotation as default,
}
