'use strict'

const { inspect } = require( 'util'         )
const   chalk     = require( 'chalk'        )
const   Router    = require( 'koa-router'   )
const   merge     = require( 'lodash.merge' )
const   omit      = require( 'lodash.omit'  )

const { normalizeString } = require( './utils/db-getter-setter'     )
const   addRelations      = require( './utils/db-default-relations' )
const   User              = require( './db/model-user'              )
const   Customer          = require( './db/model-customer'          )
const   Product           = require( './db/model-product'          )
const   Quotation         = require( './db/model-quotation'         )
const   Invoice           = require( './db/model-invoice'           )
const   InvoiceConfig     = require( './db/model-invoice-config'    )

const  prefix  = `quotations`
const  router  = new Router({prefix: `/${prefix}`})
module.exports = router

const MESSAGES = Object.freeze({
  DEFAULT              : `quotation.error.default`            ,
  NOT_FOUND            : `quotation.error.not-found`          ,
  CANT_CONVERT         : `quotation.error.cant-convert`       ,
  CONVERT_ERROR        : `quotation.error.in-conversion`      ,
  CANT_CREATE_PRODUCTS : `quotation.error.in-product-creation`,
  NO_USER              : `quotation.error.user-not-found`     ,
  NO_CUSTOMER          : `quotation.error.customer-not-found` ,
})

//////
// ROUTES
//////

router
.get(`/`, async (ctx, next) => {
  const { userId }  = ctx.state
  const params      = addRelations.quotation({
    where: { userId }
  })
  const list = await Quotation.findAll( params )

  // put response in a “list“ key
  // • we will add pagination information later
  ctx.body = {
    list: list.map( c => c.toJSON() ),
  }
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
  const queryParams = addRelations.quotation()
  const instance    = Quotation.build( body , queryParams ).toJSON()
  delete instance.id
  ctx.body = instance
})
.post(`/new`,  async (ctx, next) => {
  const { userId }  = ctx.state
  const { body }    = ctx.request
  const [
    user,
    customer,
  ] = await Promise.all([
    User.findOne( addRelations.user({where: {id: userId }}) ),
    Customer.findOne({ where: {id: body.customerId} }),
  ])

  ctx.assert( customer , 412, MESSAGES.NO_CUSTOMER )
  ctx.assert( user     , 412, MESSAGES.NO_USER     )
  // UPDATE QUOTATION COUNT
  const quotationConfig = user.get( `quotationConfig` )
  const updatedConfig   = await quotationConfig.increment( `count`, {by: 1} )
  // BUILD QUOTATION
  const { products, ...creationData } = body
  creationData.userId                 = userId
  creationData.quotationConfigId      = user.quotationConfig.id
  creationData.productConfigId        = user.productConfig.id
  creationData.index                  = updatedConfig.count
  let quotation               = Quotation.build( creationData )
  // PARSE PRODUCTS
  const { totals, filtered }  = Product.cleanProducts({
    quotation,
    products,
    user,
  })
  // CREATE QUOTATION FIRST
  // • products need them to exist
  quotation.set( totals )
  const newQuotation = await quotation.save({
    include: [Product]
  })

  ctx.assert( newQuotation, 500, MESSAGES.DEFAULT )
  // CREATE PRODUCTS
  const newProducts = await Product.bulkCreate( filtered )

  ctx.assert( newProducts, 500, MESSAGES.CANT_CREATE_PRODUCTS )
  // RENDER A FULL QUOTATION
  const queryParams = addRelations.quotation({
    where: { id: newQuotation.get(`id`) }
  })
  const quotationWithProducts = await Quotation.findOne( queryParams )

  ctx.assert( quotationWithProducts, 500, MESSAGES.DEFAULT )
  ctx.body = quotationWithProducts
})

//----- EDIT

.get(`/:id`, async (ctx, next) => {
  const { userId }  = ctx.state
  const { id }      = ctx.params
  const queryParams = addRelations.quotation({
    where: { id, userId }
  })
  const instance  = await Quotation.findOne( queryParams )

  ctx.assert( instance, 404, MESSAGES.NOT_FOUND )
  ctx.body = instance
})

.post(`/:id`, async (ctx, next) => {
  const { userId }  = ctx.state
  const { id }      = ctx.params
  const { body }    = ctx.request
  const queryParams    = addRelations.quotation({
    where: { id, userId }
  })
  const [
    quotation,
    customer,
  ] = await Promise.all([
    Quotation.findOne( queryParams ),
    Customer.findById( body.customerId ),
  ])

  ctx.assert( quotation, 404, MESSAGES.NOT_FOUND )
  ctx.assert( customer, 412, MESSAGES.NO_CUSTOMER )
  const updatedQuotation = await quotation.update( body )

  // just passing the updatedQuotation return the Tax as a string O_O
  // • prevent that by getting a new instance…
  const instance  = await Quotation.findOne( queryParams )
  ctx.body = instance
})
.post(`/:id/create-invoice`, async (ctx, next) => {
  const { userId }      = ctx.state
  const { id }          = ctx.params
  const { body }        = ctx.request
  const userQuery       = addRelations.user({
    where: { id: userId }
  })
  const quotationQuery  = addRelations.quotation({
    where: { id, userId }
  })
  const [
    quotation,
    user,
  ] = await Promise.all([
    Quotation.findOne( quotationQuery ),
    User.findOne( userQuery ),
  ])

  ctx.assert( user      , 412, MESSAGES.NO_USER   )
  ctx.assert( quotation , 404, MESSAGES.NOT_FOUND )
  ctx.assert( quotation._canBeTransformedToInvoice, 412, MESSAGES.CANT_CONVERT )
  const [
    customer,
    invoiceConfig,
  ] = await Promise.all([
    Customer.findById( quotation.get( `customerId`) ),
    InvoiceConfig.findOne( {where: {userId }} ),
  ])

  ctx.assert( customer  , 412, MESSAGES.NO_CUSTOMER )
  const updateInvoiceConfig = await invoiceConfig.increment( `count`, {by: 1} )

  const emptyInvoice   = await Invoice.create({
    name           : quotation.get( `name` ),
    tax            : quotation.get( `tax` ),
    products       : quotation.get( `products` ),
    userId         : quotation.get( `userId` ),
    customerId     : quotation.get( `customerId` ),
    quotationId    : id,
    invoiceConfigId: updateInvoiceConfig.get( `id` ),
    index          : updateInvoiceConfig.get( `count` ),
  })

  ctx.assert( emptyInvoice, 500, MESSAGES.CONVERT_ERROR )
  const updatedQuotation = await Quotation.findOne( quotationQuery )

  ctx.body = updatedQuotation
})
