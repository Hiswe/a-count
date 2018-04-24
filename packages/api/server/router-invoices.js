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

router
/**
 * @api {get} /invoices list of active invoices
 * @apiVersion 1.0.0
 * @apiName GetActive
 * @apiGroup Invoices
 *
 * @apiSuccess {Object} meta pagination & ordering datas
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
 * @api {get} /invoices/archived list of archived invoices
 * @apiVersion 1.0.0
 * @apiName GetArchived
 * @apiGroup Invoices
 *
 * @apiSuccess {Object} meta pagination & ordering datas
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
 * @apiName GetOne
 * @apiGroup Invoices
 *
 * @apiParam {String} id Invoice unique ID.
 *
 * @apiSuccess {Object} meta pagination & ordering datas
 * @apiSuccess {Object[]} rows list of invoices
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
