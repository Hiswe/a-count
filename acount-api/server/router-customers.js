'use strict'

const Router = require('koa-router')

const { sequelize } = require('./db')
const dbColumns = require('./utils/db-sub-queries')
const formatList = require('./utils/db-format-list')
const Customer = require('./db/model-customer')
const Quotation = require('./db/model-quotation')
const QuotationConfig = require('./db/model-quotation-config')
const Invoice = require('./db/model-invoice')
const InvoiceConfig = require('./db/model-invoice-config')
const versions = require('./api-versions')
const V1 = versions.V1.number
const V1_1 = versions.V1_1.number

const prefix = `customers`
const router = new Router({ prefix: `/${prefix}` })
const routers = {
  [V1]: new Router({ prefix: `/${prefix}` }),
  [V1_1]: new Router({ prefix: `/${prefix}` }),
}
module.exports = routers

/**
 * @apiDefine customer
 * @apiSuccess {string} id the customer id
 * @apiSuccess {string} name the customer name
 * @apiSuccess {string} address the customer address
 * @apiSuccess {number} quotationsCount the count of the customer's active quotations
 * @apiSuccess {number} quotationsTotal the amount of money of the customer's active quotations
 * @apiSuccess {number} invoicesCount the count of the customer's active invoices
 * @apiSuccess {number} invoicesTotal the amount of money of the customer's active invoices
 * @apiSuccess {number} invoicesTotalPaid the amount of money of the customer has paid
 * @apiSuccess {number} invoicesTotalLeft the amount of money of the customer has to pay
 */

/**
 * @api {get} /v1/customers list of customers
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetActiveCustomers
 * @apiGroup Customers
 *
 * @apiUse meta
 * @apiSuccess {Object[]} rows list of customers
 */
async function getAllCustomers(ctx, next) {
  const { userId, dbQuery } = ctx.state
  // https://github.com/sequelize/sequelize/issues/4446#issuecomment-138291810
  const query = {
    where: {
      userId,
    },
    attributes: [
      `id`,
      `name`,
      `address`,
      // ...countAndTotal,
      ...dbColumns.customer.countAndTotal,
    ],
    ...dbQuery,
  }
  const list = await Customer.findAndCount(query)
  ctx.body = formatList({ list, dbQuery })
}

/**
 * @api {get} /v1/customers/new get a customer template
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetNewCustomer
 * @apiGroup Customers
 *
 * @apiSuccess {boolean} isDeactivated false
 */
async function getBlankCustomer(ctx, next) {
  const modelTemplate = new Customer().toJSON()
  delete modelTemplate.id
  ctx.body = modelTemplate
}

/**
 * @api {post} /v1/customers/new create a customer
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName PostNewCustomer
 * @apiGroup Customers
 *
 * @apiParam (Request body) {object} body the new customer form values
 *
 * @apiUse customer
 */
async function createCustomer(ctx, next) {
  const { body } = ctx.request
  // TODO: check if the user doesn't already have a customer with the same name
  body.userId = ctx.state.user.id
  const customer = await Customer.create(body)
  ctx.body = customer
}

/**
 * @api {get} /v1/customers/:id get a customer
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetCustomer
 * @apiGroup Customers
 *
 * @apiParam {string} id the customer's id
 *
 * @apiUse customer
 */
async function getCustomer(ctx, next) {
  const { userId } = ctx.state
  const { id } = ctx.params
  const query = {
    where: {
      userId,
      id,
    },
    attributes: [`id`, `name`, `address`, ...dbColumns.customer.countAndTotal],
  }
  const customer = await Customer.findOne(query)

  ctx.assert(customer, 404, `Customer not found`)
  ctx.body = customer
}

/**
 * @api {post} /v1/customers/:id update a customer
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName UpdateCustomer
 * @apiGroup Customers
 *
 * @apiParam {string} id the customer's id
 * @apiParam (Request body) {object} body the updated customer form values
 *
 * @apiUse customer
 */
async function updateCustomer(ctx, next) {
  const { userId } = ctx.state
  const { id } = ctx.params
  const { body } = ctx.request
  const instance = await Customer.findOne({
    where: { id, userId },
  })
  // TODO: check if the user doesn't already have a customer with the same name
  ctx.assert(instance, 404, `Customer not found`)
  const updated = await instance.update(body)
  ctx.body = updated
}

/**
 * @api {get} /v1/customers/:id/quotations list customer quotations
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetCustomerQuotations
 * @apiDescription list of active user's quotations not yet ready to generate an invoice
 * @apiGroup Customers
 *
 * @apiUse meta
 * @apiSuccess {Object[]} rows list of Quotations
 */
async function getCustomerQuotation(ctx, next) {
  const { userId, dbQuery } = ctx.state
  const { id } = ctx.params
  const query = {
    where: {
      userId,
      customerId: id,
      invoiceId: { $eq: null },
      archivedAt: { $eq: null },
    },
    attributes: [
      `id`,
      `index`,
      `name`,
      `totalNet`,
      `totalTax`,
      `total`,
      `createdAt`,
      `sendAt`,
      `validatedAt`,
      `signedAt`,
      `archivedAt`,
    ],
    include: [
      {
        model: QuotationConfig,
        attributes: [`startAt`, `prefix`],
      },
    ],
    ...dbQuery,
  }
  const list = await Quotation.findAndCount(query)
  ctx.body = formatList({ list, dbQuery })
}

/**
 * @api {get} /v1/customers/:id/invoices list customer invoices
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetCustomerInvoices
 * @apiDescription list of active user's invoices not yet ready to generate an invoice
 * @apiGroup Customers
 *
 * @apiUse meta
 * @apiSuccess {Object[]} rows list of invoices
 */
async function getCustomerInvoices(ctx, next) {
  const { userId, dbQuery } = ctx.state
  const { id } = ctx.params
  const queryParams = {
    where: {
      userId,
      customerId: id,
      archivedAt: { $eq: null },
    },
    attributes: [
      `id`,
      `index`,
      `name`,
      `totalNet`,
      `totalTax`,
      `totalPaid`,
      `totalLeft`,
      `total`,
      `sendAt`,
    ],
    include: [
      {
        model: InvoiceConfig,
        attributes: [`startAt`, `prefix`],
      },
      {
        model: Quotation,
        attributes: [`id`, `index`],
        include: [
          {
            model: QuotationConfig,
            attributes: [`startAt`, `prefix`],
          },
        ],
      },
    ],
    ...dbQuery,
  }
  const list = await Invoice.findAndCount(queryParams)
  ctx.body = formatList({ list, dbQuery })
}

// duplicate routers because of this
// https://github.com/alexmingoia/koa-router/issues/244

routers[V1].get(`/`, getAllCustomers)
  .get(`/new`, getBlankCustomer)
  .post(`/new`, createCustomer)
  .get(`/:id`, getCustomer)
  .post(`/:id`, updateCustomer)
  .get(`/:id/quotations`, getCustomerQuotation)
  .get(`/:id/invoices`, getCustomerInvoices)

routers[V1_1].get(`/`, getAllCustomers)
  .get(`/new`, getBlankCustomer)
  .post(`/new`, createCustomer)
  .get(`/:id`, getCustomer)
  .post(`/:id`, updateCustomer)
  .get(`/:id/quotations`, getCustomerQuotation)
  .get(`/:id/invoices`, getCustomerInvoices)
