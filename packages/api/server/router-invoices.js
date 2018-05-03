'use strict'

const { inspect } = require( 'util'         )
const   chalk     = require( 'chalk'        )
const   Router    = require( 'koa-router'   )
const   merge     = require( 'lodash.merge' )

const { normalizeString } = require( './utils/db-getter-setter'     )
const   addRelations      = require( './utils/db-default-relations' )
const   formatList        = require( './utils/db-format-list'       )
const   cleanPayments     = require( './utils/clean-payments'       )
const   User              = require( './db/model-user'              )
const   Customer          = require( './db/model-customer'          )
const   Quotation         = require( './db/model-quotation'         )
const   Invoice           = require( './db/model-invoice'           )

const  prefix  = `invoices`
const  router  = new Router({prefix: `/${prefix}`})
module.exports = router

const MESSAGES = Object.freeze({
  DEFAULT      : `invoices.error.default`,
  NOT_FOUND    : `invoices.error.not-found`,
  NO_USER      : `invoices.error.user-not-found`,
  NO_CUSTOMER  : `invoices.error.customer-not-found`,
})

/**
 * @apiDefine invoice
 * @apiSuccess {string} id the invoice id
 * @apiSuccess {string} reference the quotation reference
 * @apiSuccess {number} count the invoice number
 * @apiSuccess {string} name name of the invoice
 * @apiSuccess {string} mentions the invoice own mentions
 * @apiSuccess {number} tax the tax rate
 * @apiSuccess {array} products list of products
 * @apiSuccess {string} products._id optional id
 * @apiSuccess {boolean} products.checked if the product count in the total
 * @apiSuccess {string} products.description description of a product
 * @apiSuccess {number} products.quantity product quantity
 * @apiSuccess {number} products.price unit price
 * @apiSuccess {number} totalNet total before taxes
 * @apiSuccess {number} totalTax taxes total
 * @apiSuccess {number} total all of the above
 * @apiSuccess {number} totalPaid what has been already paid
 * @apiSuccess {number} totalLeft what remained to be paid
 * @apiSuccess {date} sendAt when the invoice was sent to the customer
 * @apiSuccess {date} archivedAt when the invoice was archived
 * @apiSuccess {string} userId the current user id
 * @apiSuccess {string} customerId the invoice's customer
 * @apiSuccess {string} productConfigId the user product configuration id
 * @apiSuccess {string} invoiceConfigId the user invoice configuration id
 * @apiSuccess {object} invoiceConfig  the user default invoice config
 * @apiSuccess {number} invoiceConfig.creationCount the user number of invoices
 * @apiSuccess {string} invoiceConfig.prefix the user default invoice reference prefix
 * @apiSuccess {string} invoiceConfig.mentions the user default invoice mentions
 * @apiSuccess {object} productConfig the user default product configuration
 * @apiSuccess {number} productConfig.quantity the user default products quantity
 * @apiSuccess {number} productConfig.price the user default products price
 * @apiSuccess {object} customer the customer
 * @apiSuccess {string} customer.id the customer id
 * @apiSuccess {string} customer.name the customer name
 * @apiSuccess {object} quotation the associated quotation
 * @apiSuccess {object} quotation.id the quotation id
 * @apiSuccess {object} quotation.reference the quotation reference
 */

router
/**
 * @api {get} /invoices list active invoices
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetActiveInvoices
 * @apiGroup Invoices
 *
 * @apiUse meta
 * @apiSuccess {Object[]} rows list of invoices
 */
.get( `/`, async (ctx, next) => {
  const { userId, dbQuery }  = ctx.state
  const queryParams = addRelations.invoice({
    where: {
      userId,
      archivedAt : { $eq : null },
    },
    ...dbQuery,
  })
  const list = await Invoice.findAndCount( queryParams )

  ctx.body = formatList({list, dbQuery})
})
/**
 * @api {get} /invoices/archived list archived invoices
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetArchivedInvoices
 * @apiGroup Invoices
 *
 * @apiUse meta
 * @apiSuccess {Object[]} rows list of invoices
 */
.get( `/archived`, async (ctx, next) => {
  const { userId, dbQuery }  = ctx.state
  const queryParams = addRelations.invoice({
    where: {
      userId,
      archivedAt : { $not : null },
    },
    ...dbQuery,
  })
  const list = await Invoice.findAndCount( queryParams )
  ctx.body = formatList({list, dbQuery})
})

//----- EDIT
/**
 * @api {get} /invoices/:id get an invoice
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetInvoice
 * @apiGroup Invoices
 *
 * @apiParam {String} id Invoice unique ID.
 *
 * @apiUse invoice
 */
.get( `/:id`, async (ctx, next) => {
  const { userId }  = ctx.state
  const { id }      = ctx.params
  const queryParams = addRelations.invoice({
    where: { id, userId },
  })
  const instance    = await Invoice.findOne( queryParams )

  ctx.assert( instance, 404, MESSAGES.NOT_FOUND )
  ctx.body = instance
})
/**
 * @api {post} /invoices/:id update an invoice
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName UpdateInvoice
 * @apiGroup Invoices
 *
 * @apiParam {String} id Invoice unique ID.
 * @apiParam (Request body) {object} body the invoice form values
 *
 * @apiUse invoice
 */
.post(`/:id`, async (ctx, next) => {
  const { userId }  = ctx.state
  const { id }      = ctx.params
  const { body }    = ctx.request
  const queryParams = addRelations.invoice({
    where: { id, userId }
  })
  const invoice = await Invoice.findOne( queryParams )

  ctx.assert( invoice, 404, MESSAGES.NOT_FOUND )
  const { payments, ...creationData } = body
  const { totals, filtered } = cleanPayments({
    payments: payments,
    tax:      invoice.get(`tax`),
    total:    invoice.get(`total`),
  })
  const updatedInvoice = await invoice.update({
    payments: filtered,
    ...totals,
    ...creationData,
  })

  ctx.assert( updatedInvoice, 500,  MESSAGES.DEFAULT )
  const instance       = await Invoice.findOne( queryParams )

  ctx.assert( instance, 500,  MESSAGES.DEFAULT )
  ctx.body = instance
})
/**
 * @api {post} /invoices/:id/archive archive an invoice
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName ArchiveInvoice
 * @apiGroup Invoices
 *
 * @apiParam {String} id Invoice unique ID.
 *
 * @apiUse invoice
 */
.post(`/:id/archive`, async (ctx, next) => {
  const { userId }  = ctx.state
  const { id }      = ctx.params
  const invoice     = await Invoice.findOne({ where: {
    id,
    userId,
    archivedAt : { $eq : null },
  }})

  ctx.assert( invoice , 404, MESSAGES.NOT_FOUND )
  await invoice.update({ archivedAt: new Date() })
  const query       = addRelations.invoice({ where: { id, userId }})
  const updatedInvoice = await Invoice.findOne( query )

  ctx.body = updatedInvoice
})
