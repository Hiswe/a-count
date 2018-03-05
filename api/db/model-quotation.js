import Sequelize from 'sequelize'
import isNil from 'lodash/isnil'

import config from '../config'
import sequelize from './connection'
import * as h from './_helpers'

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
  count: {
    type:         new Sequelize.VIRTUAL(Sequelize.FLOAT, [`quotation-count`]),
    get:          function() {
      const quotationCount = this.get( `quotation-count` )
      return false
      if (!quotationCount) return false
      return quotationCount.get(`count`)
    }
  },
  // PRODUCTS
  products: {
    type:         Sequelize.ARRAY( Sequelize.JSON ),
    allowNull:    false,
    defaultValue: [],
    set: function (products) {
      const defaultProduct = this.get( `defaultProduct` )
      const updatedProducts = products
        // force numeric values for quantity & price
        .map( product => {
          const normalizedProduct = {}
          ;[`quantity`, `price`].forEach( key => {
            const num = parseFloat( product[key], 10 )
            normalizedProduct[key] = Number.isNaN( num ) ? defaultProduct[key] : num
          })
          const hasDesc = typeof product.description === `string`
          normalizedProduct.description = hasDesc ? product.description.trim() : ``
          return normalizedProduct
        })
        // Filter all default product
        .filter( product => {
          const isSameAsDefault = Object.keys( defaultProduct )
          .map( key => product[key] === defaultProduct[key] )
          .reduce( (acc, curr) => acc && curr, true)
        return !isSameAsDefault
      })
      this.setDataValue( `products`, updatedProducts )
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
      if ( !products ) return 0;
      const total = products.reduce( (accumulator, currentValue)  => {
        return accumulator + currentValue.quantity * currentValue.price
      }, 0)
      return h.roundToNearestQuarter( total )
    },
  },
  totalTax: {
    type: new Sequelize.VIRTUAL(Sequelize.FLOAT, [`totalNet`, `tax`]),
    get: function () {
      const totalNet = this.get( `totalNet` )
      const tax = this.get( `tax` )
      return h.roundToNearestQuarter( totalNet * tax / 100 )
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

// Don't use upsert as it didn't return an instance but only a status
// http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-upsert
// https://medium.com/@griffinmichl/async-await-with-ternary-operators-af19f374215
Quotation.updateOrCreate = async function( id, params ) {
  const instance = await ( id ? this.findById(id) : new Quotation() )
  if ( !instance ) return null
  const updated = await instance.update( params )
  // if ( !id ) await QuotationCount.create({quotationId: updated.id})
  return updated
}

export {
  Quotation as default,
}
