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

const  prefix  = `quotations`
const  router  = new Router({prefix: `/${prefix}`})
module.exports = router

const MESSAGES = Object.freeze({
  DEFAULT      : `quotation.error.default`,
  NOT_FOUND    : `quotation.error.not-found`,
  CANT_CONVERT : `quotation.error.cant-convert`,
  CONVERT_ERROR: `quotation.error.in-conversion`,
  NO_USER      : `quotation.error.user-not-found`,
  NO_CUSTOMER  : `quotation.error.customer-not-found`,
})

//////
// ROUTES
//////

router
.get(`/`, async (ctx, next) => {
  const params = Quotation.mergeWithDefaultRelations({
    where: {
      userId: ctx.state.user.id,
    },
  })
  const list = await Quotation.findAll( params )

  // put response in a “list“ key
  // • we will add pagination information later
  ctx.body = formatResponse( {
    list: list.map( c => c.toJSON() ),
  } )
})

//----- NEW

.get(`/new`, async (ctx, next) => {
  const { user } = ctx.state
  const body = {
    user,
    quotationConfig: user.quotationConfig,
    productConfig  : user.productConfig,
  }
  // Build non-persistent instance
  const params    = Quotation.mergeWithDefaultRelations( {} )
  const instance  = Quotation.build( body , params ).toJSON()
  delete instance.id
  ctx.body = formatResponse( instance )
})
.post(`/new`,  async (ctx, next) => {
  const { user } = ctx.state
  const { body } = ctx.request
  const [ customer, dbUser ] = await Promise.all([
    Customer.findById( body.customerId ),
    User.findOneWithRelations( {where: {id: user.id }} ),
  ])

  ctx.assert( customer, 412, MESSAGES.NO_CUSTOMER )
  ctx.assert( dbUser, 412, MESSAGES.NO_USER )

  const quotationConfig = dbUser.get( `quotationConfig` )
  const updatedConfig   = await quotationConfig.increment( `count`, {by: 1} )

  const params        = Quotation.mergeWithDefaultRelations( {} )
  const quotationBody = merge( {}, body, {
    userId:             dbUser.get( `id` ),
    quotationConfigId:  dbUser.get( `quotationConfig`).id,
    productConfigId  :  dbUser.get( `productConfig` ).id,
    index:              updatedConfig.get( `count` ),
  })
  const newQuotation  = await Quotation.create( quotationBody, params )
  ctx.assert( newQuotation, 500, MESSAGES.DEFAULT )

  // need to re-query to have the relations ok…
  const quotation     = await Quotation.findOneWithRelations({
    where: { id: newQuotation.get(`id`) }
  })
  ctx.body = quotation
})

//----- EDIT

.get(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const instance  = await Quotation.findOneWithRelations( {where: { id }} )
  ctx.assert( instance, 404, MESSAGES.NOT_FOUND )
  ctx.body = instance
})
.post(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const { body }  = ctx.request
  const [ quotation, customer ] = await Promise.all([
    Quotation.findOneWithRelations( {where: { id }} ),
    Customer.findById( body.customerId ),
  ])

  ctx.assert( quotation, 404, MESSAGES.NOT_FOUND )
  ctx.assert( customer, 412, MESSAGES.NO_CUSTOMER )
  const updatedQuotation = await quotation.update( body )

  // just passing the updatedQuotation return the Tax as a string O_O
  // • prevent that by getting a new instance…
  const instance  = await Quotation.findOneWithRelations( {where: { id }} )
  ctx.body = instance
})
.post(`/:id/convert`, async (ctx, next) => {
  const userId    = ctx.state.user.id
  const { id }    = ctx.params
  const { body }  = ctx.request

  const [ quotation, customer, dbUser ] = await Promise.all([
    Quotation.findOneWithRelations( {where: { id }} ),
    Customer.findById( body.customerId ),
    User.findOneWithRelations( {where: {id: userId }} ),
  ])

  ctx.assert( dbUser    , 412, MESSAGES.NO_USER     )
  ctx.assert( customer  , 412, MESSAGES.NO_CUSTOMER )
  ctx.assert( quotation , 404, MESSAGES.NOT_FOUND   )
  ctx.assert( quotation._canBeTransformedToInvoice, 412, MESSAGES.CANT_CONVERT )

  await dbUser.increment( `invoiceCount`, {by: 1} )
  const updatedUser = await User.findOneWithRelations( {where: {id: userId }} )

  ctx.state.user = formatResponse( updatedUser )

  const emptyInvoice   = Invoice.build({
    name:         quotation.get( `name` ),
    tax:          quotation.get( `tax` ),
    products:     quotation.get( `products` ),
    userId:       quotation.get( `userId` ),
    customerId:   quotation.get( `customerId` ),
    quotationId:  id,
    index: updatedUser.invoiceCount,
  })
  emptyInvoice.setUser( dbUser, {save: false} )
  emptyInvoice.setQuotation( quotation, {save: false} )
  emptyInvoice.setCustomer( customer, {save: false} )
  await emptyInvoice.save()

  const invoice = await Invoice.findOneWithRelations({
    where: { id: emptyInvoice.get(`id`) },
  })

  ctx.assert( invoice, 500, MESSAGES.CONVERT_ERROR )

  ctx.body = formatResponse( invoice )
})
