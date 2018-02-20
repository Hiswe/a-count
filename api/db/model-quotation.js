import Sequelize from 'sequelize'
import isNil from 'lodash/isnil'

import config from '../config'
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
    allowNull:    true,
    get:          function() {
      const tax = this.getDataValue( `tax` )
      if ( isNil(tax) ) return config.businessDefault.tax
      return tax
    },
    set:          function(val) {
      if ( isNil(val) || val === `` ) {
        return this.setDataValue( `tax`, config.businessDefault.tax )
      }
      this.setDataValue( `tax`, val )
    },
  },
  // PRODUCTS
  products: {
    type:         Sequelize.ARRAY( Sequelize.JSON ),
    allowNull:    false,
    defaultValue: [],
    set: function (products) {
      const defaultProduct = this.get( `defaultProduct` )
      products = products
        // force numeric values for quantity & price
        .map( product => {
          ;[`quantity`, `price`].forEach( key => {
            const num = parseFloat( product[key], 10 )
            product[key] = Number.isNaN( num ) ? defaultProduct[key] : num
          })
          product.description = product.description.trim()
          return product
        })
        // Filter all default product
        .filter( product => {
          const isSameAsDefault = Object.keys( defaultProduct )
          .map( key => product[key] === defaultProduct[key] )
          .reduce( (acc, curr) => acc && curr, true)
        return !isSameAsDefault
      })
      this.setDataValue( `products`, products )
    }
  },
  defaultProduct: {
    type: new Sequelize.VIRTUAL(Sequelize.JSON),
    get: function () {
      return {
        description:  ``,
        quantity:     config.businessDefault.quantity,
        price:        config.businessDefault.price,
      }
    },
  },
  totalNet: {
    type: new Sequelize.VIRTUAL(Sequelize.FLOAT, [`products`]),
    get: function () {
      const products = this.getDataValue( `products` )
      const total = products.reduce( (accumulator, currentValue)  => {
        return accumulator + currentValue.quantity * currentValue.price
      }, 0)
      return total
    },
  },
  totalTax: {
    type: new Sequelize.VIRTUAL(Sequelize.FLOAT, [`totalNet`, `tax`]),
    get: function () {
      const totalNet = this.get( `totalNet` )
      const tax = this.get( `tax` )
      return totalNet * tax / 100
    },
  },
  total: {
    type: new Sequelize.VIRTUAL(Sequelize.FLOAT, [`totalNet`,`totalTax` ]),
    get: function () {
      const totalNet = this.get( `totalNet` )
      const totalTax = this.get( `totalTax` )
      return totalNet + totalTax
    },
  },
  // STATUS
  sendAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          h.getNormalizedDate( `sendAt` ),
    set:          h.setNormalizedDate( `sendAt` ),
  },
  validatedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          h.getNormalizedDate( `validatedAt` ),
    set:          h.setNormalizedDate( `validatedAt` ),
  },
  signedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          h.getNormalizedDate( `signedAt` ),
    set:          h.setNormalizedDate( `signedAt` ),
  },
  archivedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    get:          h.getNormalizedDate( `archivedAt` ),
    set:          h.setNormalizedDate( `archivedAt` ),
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
})

Quotation.updateOrCreate = h.updateOrCreate( Quotation )

export {
  Quotation as default,
}
