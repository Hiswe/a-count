'use strict'

const { inspect } = require( 'util'         )
const   chalk     = require( 'chalk'        )
const   Router    = require( 'koa-router'   )
const   merge     = require( 'lodash.merge' )
const   omit      = require( 'lodash.omit'  )

const { normalizeString } = require( './utils/db-getter-setter'     )
const   addRelations      = require( './utils/db-default-relations' )
const   formatList        = require( './utils/db-format-list'       )
const   cleanProducts     = require( './utils/clean-products'       )
const   User              = require( './db/model-user'              )
const   Customer          = require( './db/model-customer'          )
const   Quotation         = require( './db/model-quotation'         )
const   Invoice           = require( './db/model-invoice'           )
const   InvoiceConfig     = require( './db/model-invoice-config'    )

const  prefix  = `quotations`
const  router  = new Router({prefix: `/${prefix}`})
module.exports = router

const MESSAGES = Object.freeze({
  DEFAULT                   : `quotation.error.default`                   ,
  NOT_FOUND                 : `quotation.error.not-found`                 ,
  FORBIDDEN                 : `quotation.error.forbidden`                 ,
  CANT_CONVERT              : `quotation.error.cant-convert`              ,
  CONVERT_ERROR             : `quotation.error.in-conversion`             ,
  CANT_UPDATE_QUOTE_COUNT   : `quotation.error.in-quotation-count-update` ,
  CANT_UPDATE_INVOICE_COUNT : `quotation.error.in-invoice-count-update`   ,
  CANT_CREATE_PRODUCTS      : `quotation.error.in-product-creation`       ,
  NO_USER                   : `quotation.error.user-not-found`            ,
  NO_CUSTOMER               : `quotation.error.customer-not-found`        ,
})

//////
// ROUTES
//////

router
.get(`/`, async (ctx, next) => {
  const { userId, dbQuery } = ctx.state
  // get all not ready to have invoice
  const params      = addRelations.quotations({
    where: {
      userId,
      invoiceId  : { $eq : null },
      archivedAt : { $eq : null },
      $or: {
        sendAt      : { $eq : null },
        validatedAt : { $eq : null },
        signedAt    : { $eq : null },
        total       : { $eq : 0    },
      },
    },
    ...dbQuery,
  })
  const list  = await Quotation.findAndCount( params )

  ctx.body = formatList({list, dbQuery})
})
.get(`/ready-to-invoice`, async (ctx, next) => {
  const { userId, dbQuery } = ctx.state
  const params      = addRelations.quotations({
    where: {
      userId,
      invoiceId   : { $eq  : null },
      archivedAt  : { $eq  : null },
      sendAt      : { $not : null },
      validatedAt : { $not : null },
      signedAt    : { $not : null },
      total       : { $not : 0    },
    },
    ...dbQuery
  })
  const list = await Quotation.findAndCount( params )

  ctx.body = formatList({list, dbQuery})
})
.get( `/archived`, async (ctx, next) => {
  const { userId, dbQuery }  = ctx.state
  const queryParams = addRelations.quotations({
    where: {
      userId,
      archivedAt : { $not : null },
    },
    ...dbQuery,
  })
  const list = await Quotation.findAndCount( queryParams )
  ctx.body = formatList({list, dbQuery})
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
    Customer.findOne({ where: {id: body.customerId, userId} }),
  ])

  ctx.assert( customer , 412, MESSAGES.NO_CUSTOMER )
  ctx.assert( user     , 412, MESSAGES.NO_USER     )
  // UPDATE QUOTATION COUNT
  const quotationConfig = user.get( `quotationConfig` )
  const updatedConfig   = await quotationConfig.increment( `creationCount`, {by: 1} )

  ctx.assert( updatedConfig, 500, MESSAGES.CANT_UPDATE_QUOTE_COUNT )
  const { products, tax, ...creationData } = body
  // PARSE PRODUCTS
  // • we don't use sequelize hooks because we need to access the productConfig
  // • it won't be available on creation
  const { totals, filtered } = cleanProducts({
    products,
    tax,
    productConfig: user.get( `productConfig` ),
  })
  // CREATE QUOTATION WITH RELATIONS
  const quotation = await Quotation.create({
    userId,
    tax,
    quotationConfigId:  user.quotationConfig.id,
    productConfigId:    user.productConfig.id,
    index:              updatedConfig.get(`creationCount`),
    products:           filtered,
    ...totals,
    ...creationData,
  })

  ctx.assert( quotation, 500, MESSAGES.DEFAULT )
  // RENDER A FULL QUOTATION
  const queryParams = addRelations.quotation({
    where: { id: quotation.get(`id`) }
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
    Customer.findOne( {where: {userId, id: body.customerId}} ),
  ])

  ctx.assert( customer, 412, MESSAGES.NO_CUSTOMER )
  ctx.assert( quotation, 404, MESSAGES.NOT_FOUND )

  // DON'T ALLOW UPDATES ON ARCHIVE
  const isLiving = quotation.get( `archivedAt` ) === null
  ctx.assert( isLiving, 403, MESSAGES.FORBIDDEN )

  // PARSE PRODUCTS
  // • we don't use sequelize hooks because we need to access the productConfig
  // • it won't be available on creation
  const { products, tax, ...creationData } = body
  const { totals, filtered } = cleanProducts({
    products,
    tax,
    productConfig: quotation.get( `productConfig` ),
  })
  const updatedQuotation = await quotation.update({
    tax,
    products: filtered,
    ...totals,
    ...creationData,
  })

  ctx.assert( updatedQuotation, 500, MESSAGES.DEFAULT )
  const quotationWithProducts  = await Quotation.findOne( queryParams )

  ctx.assert( quotationWithProducts, 500, MESSAGES.DEFAULT )
  ctx.body = quotationWithProducts
})
.post(`/:id/create-invoice`, async (ctx, next) => {
  const { userId }      = ctx.state
  const { id }          = ctx.params
  const userQuery       = addRelations.user({
    where: { id: userId }
  })
  const [
    quotation,
    invoiceConfig,
  ] = await Promise.all([
    Quotation.findOne({ where: {id, userId} }),
    InvoiceConfig.findOne({ where: {userId} }),
  ])

  ctx.assert( quotation , 404, MESSAGES.NOT_FOUND )
  ctx.assert( quotation._canCreateInvoice, 412, MESSAGES.CANT_CONVERT )
  const customer = await Customer.findOne( {where: {
    id: quotation.get( `customerId`)},
    userId,
  })

  ctx.assert( customer  , 412, MESSAGES.NO_CUSTOMER )
  const updateInvoiceConfig = await invoiceConfig.increment( `creationCount`, {by: 1} )

  const invoice   = await Invoice.create({
    name           : quotation.get( `name` ),
    tax            : quotation.get( `tax` ),
    products       : quotation.get( `products` ),
    totalNet       : quotation.get( `totalNet` ),
    totalTax       : quotation.get( `totalTax` ),
    total          : quotation.get( `total` ),
    totalLeft      : quotation.get( `total` ),
    totalPaid      : 0,
    userId         : quotation.get( `userId` ),
    customerId     : quotation.get( `customerId` ),
    invoiceConfigId: updateInvoiceConfig.get( `id` ),
    index          : updateInvoiceConfig.get( `creationCount` ),
  })

  await quotation.update({
    invoiceId:  invoice.id,
    archivedAt: new Date(),
  })
  const quotationQuery  = addRelations.quotation({
    where: { id, userId }
  })
  const updatedQuotation = await Quotation.findOne( quotationQuery )
  ctx.body = updatedQuotation
})
.post(`/:id/archive`, async (ctx, next) => {
  const { userId }  = ctx.state
  const { id }      = ctx.params
  const quotation   = await Quotation.findOne({ where: {
    id,
    userId,
    archivedAt : { $eq : null },
  }})

  ctx.assert( quotation , 404, MESSAGES.NOT_FOUND )
  await quotation.update({ archivedAt: new Date() })
  const query            = addRelations.quotation({ where: { id, userId }})
  const updatedQuotation = await Quotation.findOne( query )

  ctx.assert( updatedQuotation , 404, MESSAGES.NOT_FOUND )
  ctx.body = updatedQuotation
})
