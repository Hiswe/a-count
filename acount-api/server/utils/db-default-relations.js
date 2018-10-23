'use strict'

const merge = require( 'lodash.merge' )

const User            = require( '../db/model-user'             )
const Customer        = require( '../db/model-customer'         )
const ProductConfig   = require( '../db/model-product-config'   )
const Quotation       = require( '../db/model-quotation'        )
const QuotationConfig = require( '../db/model-quotation-config' )
const Invoice         = require( '../db/model-invoice'          )
const InvoiceConfig   = require( '../db/model-invoice-config'   )

const userParams = {
  where: {
    // make sure we don't require a user without an ID
    id:             false,
    isDeactivated:  { $not: true },
  },
  attributes: [`id`, `email`, `name`, `address`, `lang`, `currency`],
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

const quotationsParams = {
  include: [
    {
      model: QuotationConfig,
      attributes: [`creationCount`, `prefix`, `startAt`],
    },
    {
      model: Customer,
      attributes: [`id`, `name`],
    },
    {
      model:      Invoice,
      required:   false,
      attributes: [`id`, `index`, `archivedAt`],
      include: [
        {
          model: InvoiceConfig,
          attributes: {exclude: [`id`, `userId`]},
        },
      ]
    },
  ],
}

const quotationParams = {
  include: [
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
      attributes: [`id`, `name`, `address`],
    },
    {
      model:      Invoice,
      required:   false,
      attributes: [`id`, `index`, `archivedAt`],
      include: [
        {
          model: InvoiceConfig,
          attributes: {exclude: [`id`, `userId`]},
        },
      ]
    },
  ],
}

const invoiceParams = {
  include: [
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
        {
          model: QuotationConfig,
          attributes: {exclude: [`id`, `userId`]},
        },
      ]
    },
  ]
}

module.exports = {
  user:       (params = {}) => merge({}, userParams, params),
  quotations: (params = {}) => merge({}, quotationsParams, params),
  quotation:  (params = {}) => merge({}, quotationParams, params),
  invoice:    (params = {}) => merge({}, invoiceParams, params),
}
