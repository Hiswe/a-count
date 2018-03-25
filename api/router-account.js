'use strict'

const merge = require( 'lodash.merge' )
const Router = require( 'koa-router' )

const config = require( './config' )
const formatResponse = require( './_format-response' )
const log = require( './_log' )
const dbHelpers = require( './db/_helpers' )
const User = require( './db/model-user' )
const DefaultQuotation = require( './db/model-default-quotation' )
const DefaultInvoice = require( './db/model-default-invoice' )
const DefaultProduct = require( './db/model-default-product' )
const jwtStore = require( './jwt-store' )

const prefix = `account`
const publicRouter = new Router({prefix: `/${prefix}`})
const privateRouter = new Router({prefix: `/${prefix}`})
module.exports = {
  public: publicRouter,
  private: privateRouter,
}
//----- UTILS

async function userAuthResponse( ctx, user ) {
  const accessToken = await jwtStore.add( user )
  ctx.response.set( `authorization`, `Bearer ${ accessToken }` )
  const result = formatResponse( user )
  ctx.body = result
}

//////
// PUBLIC
//////

publicRouter
.post( `/register`, async (ctx, next) => {
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
  await userAuthResponse( ctx, user )
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
  ctx.assert( isPasswordValid, 401, `Invalid password` )

  await userAuthResponse( ctx, user )
})
.post( `/forgot`, async (ctx, next) => {
    const { body }  = ctx.request
    const user = await User.findOne({
      where: {
        email: body.email,
      }
    })
    ctx.assert( user, 404, `Email not found` )

    await user.resetPassword( body.redirectUrl )
    ctx.body = formatResponse({
      email: user.email,
      reset: true,
    })
})
.post( `/reset`, async (ctx, next) => {
    const { body }  = ctx.request
    const user = await User.findOne({
      where: {
        token:        body.token,
        tokenExpire:  { $gt: Date.now() },
      }
    })
    ctx.assert( user, 404, `link expired` )

    await user.setPassword( body.password )
    ctx.body = formatResponse({
      email: user.email,
      reset: true,
    })
})

//////
// PRIVATE
//////

privateRouter
.get( `/auth`, async (ctx, next) => {
  ctx.assert( ctx.state && ctx.state.user, 401, `Not connected` )
  const result = formatResponse( ctx.state.user )
  ctx.body = result
})
.get( `/logout`, async (ctx, next) => {
  const { jwtData } = ctx.state
  await jwtStore.remove( jwtData )
  ctx.state.user = null
  ctx.response.set( `authorization`, `` )
  ctx.body = formatResponse( { message: `bye bye` } )
})
