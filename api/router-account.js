'use strict'

const merge  = require( 'lodash.merge' )
const Router = require( 'koa-router'   )

const config          = require( './config'                    )
const log             = require( './utils/log'                 )
const formatResponse  = require( './utils/format-response'     )
const dbGetterSetter  = require( './utils/db-getter-setter'    )
const User            = require( './db/model-user'             )
const QuotationConfig = require( './db/model-quotation-config' )
const InvoiceConfig   = require( './db/model-invoice-config'   )
const ProductConfig   = require( './db/model-product-config'   )
const jwtStore        = require( './jwt-store'                 )

const prefix        = `account`
const publicRouter  = new Router({prefix: `/${prefix}`})
const privateRouter = new Router({prefix: `/${prefix}`})
module.exports = {
  public: publicRouter,
  private: privateRouter,
}
//----- UTILS

async function connectUser( ctx, user ) {
  const userId = user.id
  user = await User.findOneWithRelations( { where: {id: userId }} )
  const accessToken = await jwtStore.add( user )
  const result = formatResponse({
    user,
    access_token: accessToken,
  })
  ctx.body = result
}

//////
// PUBLIC
//////

publicRouter
.post( `/register`, async (ctx, next) => {
  const { body }  = ctx.request
  const data = merge( body, {
    quotationConfig: {},
    invoiceConfig: {},
    productConfig: {},
  })
  const user = await User.create( data, {
    include: [
      QuotationConfig,
      InvoiceConfig,
      ProductConfig,
    ]
  })
  await connectUser( ctx, user )
})
.post( `/login`, async (ctx, next) => {
  const { body }  = ctx.request
  const user      = await User.findOne({
    where: {
      email:          dbGetterSetter.normalizeString( body.email ),
      isDeactivated:  { $not: true },
    },
  })
  ctx.assert( user, 404, `User not found` )

  const isPasswordValid = await user.comparePassword( body.password )
  ctx.assert( isPasswordValid, 401, `Invalid password` )

  await connectUser( ctx, user )
})
.post( `/forgot`, async (ctx, next) => {
  const { body }  = ctx.request
  const user = await User.findOne({
    where: {
      email: body.email,
      isDeactivated: { $not: true },
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
      isDeactivated:  { $not: true },
      token:          body.token,
      tokenExpire:    { $gt: Date.now() },
    }
  })
  ctx.assert( user, 404, `link expired` )

  const updatedUser = await user.setPassword( body.password )
  await jwtStore.removeAllFromUser( user.id )
  await connectUser( ctx, updatedUser )
})

//////
// PRIVATE
//////

privateRouter
.get( `/auth`, async (ctx, next) => {
  ctx.assert( ctx.state && ctx.state.user, 401, `Not connected` )
  const result = formatResponse( {user: ctx.state.user} )
  ctx.body = result
})
.get( `/logout`, async (ctx, next) => {
  const { jwtData } = ctx.state
  await jwtStore.remove( jwtData )

  ctx.state.user = null
  ctx.response.set( `authorization`, `` )
  ctx.body = formatResponse({
    message:      `bye bye`,
    access_token: ``,
  })
})
.post( `/settings`, async (ctx, next) => {
  const { id }    = ctx.state && ctx.state.user
  const { body }  = ctx.request
  const instance  = await User.findOneWithRelations({
    where: { id }
  })

  ctx.assert(instance, 404, `Can't find User. The associated user isn't found`)
  const updated   = await instance.update( body )

  const relations = [`quotationConfig`, `invoiceConfig`, `productConfig`]
  await Promise.all( relations.map( relationName => {
    return instance[ relationName ].update( body[ relationName ] )
  }))

  const user      = await User.findOneWithRelations({
    where: {id: updated.id}
  })

  const result      = formatResponse( { user } )
  ctx.state.user    = result
  ctx.body          = result
})
