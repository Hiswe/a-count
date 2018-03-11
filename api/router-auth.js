'use strict'

const merge = require( 'lodash.merge' )
const Router = require( 'koa-router' )

const formatResponse = require( './_format-response' )
const dbHelpers = require( './db/_helpers' )
const helpers = require( './_helpers' )
const User = require( './db/model-user' )
const DefaultQuotation = require( './db/model-default-quotation' )
const DefaultInvoice = require( './db/model-default-invoice' )
const DefaultProduct = require( './db/model-default-product' )

const router = new Router()
module.exports = router

const getUserParams = {
  where: {
    isDeactivated:  { $not: true },
  },
  attributes: {
    exclude: [`token`, `tokenExpire`, `createdAt`, `updatedAt`],
  },
  include: [{
    model: DefaultQuotation,
  }, {
    model: DefaultInvoice,
  }, {
    model: DefaultProduct,
  }]
}

router
.get( `/auth`, async (ctx, next) => {
  ctx.assert( ctx.session && ctx.session.user, 401, `Not connected` )
  ctx.body = formatResponse( ctx.session.user )
})
.post(`/register`, async (ctx, next) => {
  const { body }  = ctx.request
  const data = merge( body, {
    defaultQuotation: {},
    defaultInvoice: {},
    defaultProduct: {},
  })
  const user = await User.create( data, {
    include: [
      DefaultQuotation,
      DefaultInvoice,
      DefaultProduct,
    ]
  })
  const result      = formatResponse( user )
  ctx.session.user  = result
  ctx.body          = result
})
.post( `/login`, async (ctx, next) => {
  const { body }  = ctx.request
  const user      = await User.findOneWithRelations({
    where: {
      email: dbHelpers.normalizeString( body.email )
    },
  })
  ctx.assert( user, 404, `User not found` )

  const isPasswordValid = await user.comparePassword( body.password )
  ctx.assert( user, 401, `Invalid password` )

  const result      = formatResponse( user )
  ctx.session.user  = result
  ctx.body          = result
})
.get( `/logout`, async (ctx, next) => {
  ctx.session = null
  ctx.body = formatResponse( { message: `bye bye` } )
})
