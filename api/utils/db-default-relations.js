'use strict'

const merge = require( 'lodash.merge' )

const User            = require( '../db/model-user'             )
const Customer        = require( '../db/model-customer'         )
const ProductConfig   = require( '../db/model-product-config'   )
const Quotation       = require( '../db/model-quotation'        )
const QuotationConfig = require( '../db/model-quotation-config' )
const Invoice         = require( '../db/model-invoice'          )
const InvoiceConfig   = require( '../db/model-invoice-config'   )

const defaultUserParams = {
  where: {
    isDeactivated:  { $not: true },
  },
  attributes: [`id`, `email`, `name`, `lang`, `currency`],
  include: [
    {
      model: QuotationConfig,
      attributes: {
        exclude: [`userId`],
      }
    },
    {
      model: InvoiceConfig,
      attributes: {
        exclude: [`userId`],
      }
    },
    {
      model: ProductConfig,
      attributes: {
        exclude: [`userId`],
      }
    },
  ]
}

const defaultQuotationParams = {
  include: [
    {
      model: User,
      attributes: [`currency`],
    },
    {
      model: ProductConfig,
      attributes: {exclude: [`id`, `userId`]},
    },
    {
      model: QuotationConfig,
      attributes: {exclude: [`id`, `userId`]},
    },
    {
      model: Customer,
      attributes: [`id`, `name`, `address`]
    },
    {
      model:      Invoice,
      required:   false,
      attributes: [`id`, `index`],
      include: [
        {
          model: InvoiceConfig,
          attributes: {exclude: [`id`, `userId`]},
        },
      ]
    },
  ]
}

const defaultInvoiceParams = {
  include: [
    {
      model: User,
      attributes: [`currency`],
    },
    {
      model: InvoiceConfig,
      attributes: { exclude: [`id`, `userId`] },
    },
    {
      model: Customer,
      attributes: [`id`, `name`, `address`],
    },
    {
      model:      Quotation,
      attributes: [`id`, `index`],
      include: [
        // {
        //   model: ProductConfig,
        //   attributes: {exclude: [`id`, `userId`]},
        // },
        {
          model: QuotationConfig,
          attributes: {exclude: [`id`, `userId`]},
        },
      ]
    },
  ]
}

module.exports = {
  user: function quotation( additionalParams = {} ) {
    return merge( {}, defaultUserParams, additionalParams )
  },
  quotation: function quotation( additionalParams = {} ) {
    return merge( {}, defaultQuotationParams, additionalParams )
  },
  invoice: function invoice( additionalParams = {} ) {
    return merge( {}, defaultInvoiceParams, additionalParams )
  }
}
