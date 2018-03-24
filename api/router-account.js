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

const prefix = `account`
const publicRouter = new Router({prefix: `/${prefix}`})
const privateRouter = new Router({prefix: `/${prefix}`})
module.exports = {
  public: publicRouter,
  private: privateRouter,
}
//----- UTILS

function createJWT( user ) {
  const { secret, expiresIn } = config.jwt
  const data       = {
    id:           user.id,
    jwtVersion:   user.jwtVersion,
  }
  return jsonwebtoken.sign( data, secret, {expiresIn} )
}

function userAuthResponse( ctx, user ) {
  const accessToken = createJWT( user )
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
  userAuthResponse( ctx, user )
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

  userAuthResponse( ctx, user )
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
.get( `/logout`, async (ctx, next) => {
  ctx.session = null
  ctx.body = formatResponse( { message: `bye bye` } )
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
