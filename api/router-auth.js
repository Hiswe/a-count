'use strict'

const merge = require( 'lodash.merge' )
const Router = require( 'koa-router' )

const { formatResponse } = require( './_helpers' )
const { normalizeString } = require( './db/_helpers' )
const User = require( './db/model-user' )
const DefaultQuotation = require( './db/model-default-quotation' )
const DefaultInvoice = require( './db/model-default-invoice' )
const DefaultProduct = require( './db/model-default-product' )

const router = new Router()
module.exports = router

router
.get( `/auth`, async (ctx, next) => {
  ctx.assert( ctx.session && ctx.session.user, 401, `Not connected` )
  ctx.body = formatResponse( {user: ctx.session.user}, ctx )
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
  // TODO: should connect automatically
  ctx.body = formatResponse( user, ctx )
})
.post( `/login`, async (ctx, next) => {
  const { body }  = ctx.request
  const user      = await User.findOne({
    where: {
      email: normalizeString( body.email ),
      isDeactivated:  { $not: true },
    },
    attributes: {
      exclude: [`token`, `tokenExpire`, `createdAt`, `updatedAt`],
    },
    include: [{
      model: DefaultQuotation,
      attributes: {
        exclude: [`id`, `userId`]
      },
    }, {
      model: DefaultInvoice,
      attributes: {
        exclude: [`id`, `userId`]
      },
    }, {
      model: DefaultProduct,
      attributes: {
        exclude: [`id`, `userId`]
      },
    }]
  })
  ctx.assert( user, 404, `User not found` )

  const isPasswordValid = await user.comparePassword( body.password )
  ctx.assert( user, 401, `Invalid password` )

  // https://github.com/clintmod/koa-jwt-login-example/blob/master/src/app.js
  const userWithoutPassword = user.toJSON()
  delete userWithoutPassword.password
  ctx.session.user = userWithoutPassword
  ctx.body = formatResponse( {
    message: `connected as ${userWithoutPassword.email}`
  }, ctx )
})
.get( `/logout`, async (ctx, next) => {
  ctx.session = null
  ctx.body = formatResponse( { message: `bye bye` }, ctx )
})
