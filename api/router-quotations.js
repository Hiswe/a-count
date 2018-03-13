'use strict'

const { inspect } = require( 'util' )
const Router = require( 'koa-router' )
const merge = require( 'lodash.merge' )
const omit = require( 'lodash.omit' )

const formatResponse = require( './_format-response' )
const { normalizeString } = require( './db/_helpers' )
const Customer = require( './db/model-customer' )
const Quotation = require( './db/model-quotation' )
const User = require( './db/model-user' )
const DefaultQuotation = require( './db/model-default-quotation' )
const DefaultProduct = require( './db/model-default-product' )

const prefix = `quotations`
const router = new Router({prefix: `/${prefix}`})
module.exports = router

//////
// ROUTES
//////

router
.get(`/`, async (ctx, next) => {
  const params = merge( {
    where: {
      userId: ctx.session.user.id,
    },
  }, Quotation.relations )
  const list = await Quotation.findAll( params )
  // put response in a “list“ key
  // • we will add pagination information later
  ctx.body = formatResponse( {list} )
})

//----- NEW

.get(`/new`, async (ctx, next) => {
  const { user } = ctx.session
  const body = {
    user,
  }
  const params = {
    include: [
      {
        model: User,
        include: [
          DefaultQuotation,
          DefaultProduct,
        ],
      },
    ]
  }
  const modelTemplate = new Quotation( body, params ).toJSON()
  delete modelTemplate.id
  ctx.body = formatResponse( modelTemplate )
})
.post(`/new`,  async (ctx, next) => {
  const { user } = ctx.session
  const { body } = ctx.request
  const customer = await Customer.findById( body.customerId )

  ctx.assert(customer, 500, `Can't create Quotation. The associated customer isn't found`)

  const dbUser = await User.findOneWithRelations( {where: {id: user.id }} )
  ctx.assert(dbUser, 500, `Can't create Quotation. The associated user isn't found`)

  await dbUser.increment( `quotationCount`, {by: 1} )
  const updatedUser = await User.findOneWithRelations( {where: {id: user.id }} )

  ctx.session.user = formatResponse( updatedUser )

  // To avoid model quotation haven't access to his relations we
  // • build an empty quotation
  // • get it with its relations
  // • THEN update it with the body
  // • https://github.com/sequelize/sequelize/issues/3321#issuecomment-78218074
  const emptyQuotation = Quotation.build({
    index: ctx.session.user.quotationCount,
    customerId: body.customerId,
  })
  emptyQuotation.setUser( updatedUser, {save: false} )
  emptyQuotation.setCustomer( customer, {save: false} )
  await emptyQuotation.save()

  const quotation = await Quotation.findOneWithRelations({
    where: { id: emptyQuotation.get(`id`) },
  })

  const updatedQuotation = await quotation.update( body )

  ctx.assert( null, 500, `something went wrong` )

  ctx.body = formatResponse( updatedQuotation )
})

//----- EDIT

.get(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const instance  = await Quotation.findOneWithRelations( {where: { id }} )
  ctx.assert( instance, 404, `Quotation not found` )
  ctx.body = formatResponse( instance )
})
.post(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const { body }  = ctx.request
  const customer  = await Customer.findById( body.customerId )

  ctx.assert(customer, 500, `Can't update Quotation. The associated customer isn't found`)

  const quotation = await Quotation.findOneWithRelations( {where: { id }} )
  ctx.assert( quotation, 404, `Quotation not found` )

  const updatedQuotation = await quotation.update( body )

  // const instance  = await Quotation.updateOrCreate( id, body )
  // const result    = await getQuotationById( instance.id )

  // ctx.assert(result, 404, `Quotation not found`)
  ctx.body = formatResponse( updatedQuotation )
})
