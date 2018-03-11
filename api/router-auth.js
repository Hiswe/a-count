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

const removePassword = user => {
  user = typeof user.toJSON === `function` ? user.toJSON() : user
  delete user.password
  return user
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
  const newUser = await User.create( data, {
    include: [
      DefaultQuotation,
      DefaultInvoice,
      DefaultProduct,
    ]
  })
  const user = await User.findOne( merge(
    getUserParams,
    { where: { id: newUser.id } }
  ))
  const userWithoutPassword = removePassword( user )
  ctx.session.user = userWithoutPassword
  ctx.body = formatResponse( userWithoutPassword, ctx )
})
.post( `/login`, async (ctx, next) => {
  const { body }  = ctx.request
  const user      = await User.findOne( merge(
    getUserParams,
    { where: { email: normalizeString( body.email ) } }
  ))
  ctx.assert( user, 404, `User not found` )

  const isPasswordValid = await user.comparePassword( body.password )
  ctx.assert( user, 401, `Invalid password` )

  const userWithoutPassword = removePassword( user )
  ctx.session.user = userWithoutPassword
  ctx.body = formatResponse( userWithoutPassword )
})
.get( `/logout`, async (ctx, next) => {
  ctx.session = null
  ctx.body = formatResponse( { message: `bye bye` } )
})
