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
  const body = merge({
    user,
    quotationConfig: user.quotationConfig,
    productConfig: user.productConfig,
  })
  // Build non-persistent instance
  const params    = Quotation.mergeWithDefaultRelations( {} )
  const quotation = new Quotation( body , params )
  const instance  = Quotation.build( body , params ).toJSON()
  delete instance.id
  ctx.body = instance
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

  // create an “safe” instance
  // • add all needed relations
  // • doesn't trigger any setter depending on those relations
  const newInstance = await Quotation.create({
    userId:             dbUser.id,
    quotationConfigId:  dbUser.quotationConfig.id,
    productConfigId  :  dbUser.productConfig.id,
    index:              updatedConfig.count,
  })
  ctx.assert( newInstance, 500, MESSAGES.DEFAULT )

  const withRelations = await Quotation.findOneWithRelations({
    where: { id: newInstance.get(`id`) }
  })

  ctx.assert( withRelations, 500, MESSAGES.DEFAULT )
  const updated = await withRelations.update( body )
  ctx.assert( updated, 500, MESSAGES.DEFAULT )

  // just passing the updatedQuotation return the Tax as a string O_O
  // • prevent that by getting a new instance…
  const quotation     = await Quotation.findOneWithRelations({
    where: { id: updated.get(`id`) }
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
    index:        updatedUser.invoiceCount,
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
