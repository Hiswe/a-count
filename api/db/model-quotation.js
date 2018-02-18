'use strict'

import Sequelize from 'sequelize'

import sequelize from './db-connection'
import * as h from './helpers'

const steps = [
  {key: `sendAt`,       name: `send`},
  {key: `validatedAt`,  name: `validated`},
  {key: `signedAt`,     name: `signed`},
  {key: `archivedAt`,   name: `done`},
]

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
    get:          h.getNormalizedDate( `sendAt` )
  },
  validatedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          h.getNormalizedDate( `validatedAt` )
  },
  signedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          h.getNormalizedDate( `signedAt` )
  },
  archivedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          h.getNormalizedDate( `archivedAt` )
  },
  steps: {
    type: new Sequelize.VIRTUAL(Sequelize.JSON, steps.map( s => s.key)),
    get: function () {
      return steps.map( s => {
        const val   = this.get( s.key )
        return {
          key: s.key,
          name: s.name,
        }
      })
    },
  },
  customerName: {
    type: new Sequelize.VIRTUAL(Sequelize.STRING, [`customer`]),
    get: function() {
      const customer = this.get(`customer`)
      if (!customer) return ``
      return customer.get(`name`)
    }
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
