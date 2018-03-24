'use strict'

const merge = require( 'lodash.merge' )
const Router = require( 'koa-router' )
const jsonwebtoken = require( 'jsonwebtoken' )

const config = require( './config' )
const formatResponse = require( './_format-response' )
const log = require( './_log' )
const dbHelpers = require( './db/_helpers' )
const User = require( './db/model-user' )
const DefaultQuotation = require( './db/model-default-quotation' )
const DefaultInvoice = require( './db/model-default-invoice' )
const DefaultProduct = require( './db/model-default-product' )

const router = new Router()
module.exports = router

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
  const result = formatResponse({
    user,
    token: createJWT( user ),
  })
  log( `has session? `, ctx.session != null )
  // ctx.session.user  = user
  ctx.body          = result
}

//----- ROUTES

router
.get( `/auth`, async (ctx, next) => {
  ctx.assert( ctx.session && ctx.session.user, 401, `Not connected` )

  const id = ctx.session.user.id
  const user = await User.findOneWithRelations( { where: {id}} )
  if ( !user ) ctx.session = null
  ctx.assert( user, 401, `User not matching session!` )

  const result = formatResponse( user )
  ctx.session.user = result
  ctx.body = result
})
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
  ctx.assert( user, 401, `Invalid password` )

  userAuthResponse( ctx, user )

})
.get( `/logout`, async (ctx, next) => {
  ctx.session = null
  ctx.body = formatResponse( { message: `bye bye` } )
})
