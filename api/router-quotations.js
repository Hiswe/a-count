'use strict'

const { inspect } = require( 'util' )
const Router = require( 'koa-router' )

const { formatResponse } = require( './_helpers' )
const { normalizeString } = require( './db/_helpers' )
const Customer = require( './db/model-customer' )
const Quotation = require( './db/model-quotation' )
const User = require( './db/model-user' )

const prefix = `quotations`
const router = new Router({prefix: `/${prefix}`})
module.exports = router

//////
// UTILITIES
//////
const getQuotationById = (id) => {
  return Quotation.findOne( {
    where: { id,},
    include: [{
      model: Customer,
      attributes: [`id`, `name`, `address`],
    }],
  })
}

//////
// ROUTES
//////

router
.get(`/`, async (ctx, next) => {
  console.log( inspect(ctx.state, {colors: true}) )
  const all = await Quotation.findAll({
    where: {
      userId: ctx.session.user.id,
    },
    include: [{
      model: Customer,
      attributes: [`id`, `name`, `address`],
    }, {
      model: User,
    }],
  })
  ctx.body = formatResponse( all, ctx )
})

//----- NEW
.get(`/new`, async (ctx, next) => {
  const modelTemplate = new Quotation().toJSON()
  delete modelTemplate.id
  ctx.body = formatResponse(modelTemplate)
})
.post(`/new`,  async (ctx, next) => {
  const { body }      = ctx.request
  // TODO: increment user quotation count
  // http://docs.sequelizejs.com/manual/tutorial/instances.html#incrementing
  const customer      = await Customer.findById( body.customerId )
  ctx.assert(customer, 500, `Can't ${ id ? 'create' : 'update'} Quotation. The associated customer isn't found`)
  const instance  = await Quotation.updateOrCreate( false, body )
  const result    = await getQuotationById( instance.id )
  ctx.assert(result, 404, `Quotation not found`)
  ctx.body        = formatResponse( result, ctx )
})

//----- EDIT
.get(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const instance  = await getQuotationById( id )
  ctx.assert(instance, 404, `Quotation not found`)
  ctx.body = formatResponse( instance, ctx )
})
.post(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const { body }  = ctx.request
  const customer  = await Customer.findById( body.customerId )
  ctx.assert(customer, 500, `Can't ${ id ? 'create' : 'update'} Quotation. The associated customer isn't found`)
  const instance  = await Quotation.updateOrCreate( id, body )
  const result    = await getQuotationById( instance.id )
  ctx.assert(result, 404, `Quotation not found`)
  ctx.body        = formatResponse( result, ctx )
})
