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
  const params = Quotation.mergeWithDefaultRelations( {} )
  const modelTemplate = new Quotation( body , params ).toJSON()
  delete modelTemplate.id
  ctx.body = formatResponse( modelTemplate )
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
  const updatedConfig = await quotationConfig.increment( `count`, {by: 1} )

  // To avoid model quotation haven't access to his relations we:
  // • build an empty quotation
  // • get it with its relations
  // • THEN update it with the body
  // • https://github.com/sequelize/sequelize/issues/3321#issuecomment-78218074
  const emptyQuotation = Quotation.build({
    index     : updatedConfig.get(`count`),
    customerId: body.customerId,
  })
  emptyQuotation.setUser( updatedUser, {save: false} )
  emptyQuotation.setCustomer( customer, {save: false} )
  await emptyQuotation.save()

  const quotation = await Quotation.findOneWithRelations({
    where: { id: emptyQuotation.get(`id`) },
  })

  const updatedQuotation = await quotation.update( body )

  ctx.assert( updatedQuotation, 500, MESSAGES.DEFAULT )

  ctx.body = formatResponse( updatedQuotation )
})

//----- EDIT

.get(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const instance  = await Quotation.findOneWithRelations( {where: { id }} )
  ctx.assert( instance, 404, MESSAGES.NOT_FOUND )
  ctx.body = formatResponse( instance )
})
.post(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const { body }  = ctx.request

  const quotation = await Quotation.findOneWithRelations( {where: { id }} )
  ctx.assert( quotation, 404, MESSAGES.NOT_FOUND )

  const customer  = await Customer.findById( body.customerId )
  ctx.assert(customer, 412, MESSAGES.NO_CUSTOMER )

  const updatedQuotation = await quotation.update( body )
  // just passing the updatedQuotation return the Tax as a string O_O
  // • prevent that by getting a new instance…
  const instance  = await Quotation.findOneWithRelations( {where: { id }} )
  ctx.body = formatResponse( instance )
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
