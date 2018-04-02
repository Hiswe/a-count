'use strict'

const { inspect } = require( 'util'         )
const   chalk     = require( 'chalk'        )
const   Router    = require( 'koa-router'   )
const   merge     = require( 'lodash.merge' )
const   omit      = require( 'lodash.omit'  )

const   formatResponse     = require( './utils/format-response'      )
const { normalizeString  } = require( './utils/db-getter-setter'     )
const   User               = require( './db/model-user'              )
const   Customer           = require( './db/model-customer'          )
const   Quotation          = require( './db/model-quotation'         )
const   Invoice            = require( './db/model-invoice'           )
const   DefaultQuotation   = require( './db/model-default-quotation' )
const   DefaultProduct     = require( './db/model-default-product'   )

const  prefix  = `invoices`
const  router  = new Router({prefix: `/${prefix}`})
module.exports = router

const MESSAGES = Object.freeze({
  DEFAULT      : `invoice.error.default`,
  NOT_FOUND    : `invoice.error.not-found`,
  NO_USER      : `invoice.error.user-not-found`,
  NO_CUSTOMER  : `invoice.error.customer-not-found`,
})

router
.get(`/`, async (ctx, next) => {
  const params = Invoice.mergeWithDefaultRelations({
    where: {
      userId: ctx.state.user.id,
    },
  })
  const list = await Invoice.findAll( params )

  // put response in a “list“ key
  // • we will add pagination information later
  ctx.body = formatResponse( {
    list: list.map( c => c.toJSON() ),
  } )
})

//----- EDIT

.get( `/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const instance  = await Invoice.findOneWithRelations( {where: { id }} )
  ctx.assert( instance, 404, MESSAGES.NOT_FOUND )
  ctx.body = formatResponse( instance )
})

