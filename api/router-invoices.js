'use strict'

const { inspect } = require( 'util'         )
const   chalk     = require( 'chalk'        )
const   Router    = require( 'koa-router'   )
const   merge     = require( 'lodash.merge' )
const   omit      = require( 'lodash.omit'  )

const { normalizeString  } = require( './utils/db-getter-setter'     )
const   addRelations       = require( './utils/db-default-relations' )
const   cleanPayments      = require( './utils/clean-payments'       )
const   User               = require( './db/model-user'              )
const   Customer           = require( './db/model-customer'          )
const   Quotation          = require( './db/model-quotation'         )
const   Invoice            = require( './db/model-invoice'           )

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
.get(`/`, async (ctx, next) => {
  const { userId }  = ctx.state
  const queryParams = addRelations.invoice({
    where: { userId },
  })
  const list = await Invoice.findAll( queryParams )

  // put response in a “list“ key
  // • we will add pagination information later
  ctx.body = {
    list: list.map( c => c.toJSON() ),
  }
})

//----- EDIT

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
