'use strict'

const merge  = require( 'lodash.merge' )
const Router = require( 'koa-router'   )

const config          = require( './config'                     )
const addRelations    = require( './utils/db-default-relations' )
const dbColumns       = require( './utils/db-sub-queries'       )
const log             = require( './utils/log'                  )
const dbGetterSetter  = require( './utils/db-getter-setter'     )
const User            = require( './db/model-user'              )
const QuotationConfig = require( './db/model-quotation-config'  )
const InvoiceConfig   = require( './db/model-invoice-config'    )
const ProductConfig   = require( './db/model-product-config'    )
const jwtStore        = require( './jwt-store'                  )

const prefix        = `account`
const publicRouter  = new Router({prefix: `/${prefix}`})
const privateRouter = new Router({prefix: `/${prefix}`})
module.exports = {
  public : publicRouter ,
  private: privateRouter,
}
//----- UTILS

async function connectUser( ctx, user ) {
  const { id } = user
  const queryParams = addRelations.user({
    where: { id }
  })
  user = await User.findOne( queryParams )

  const accessToken = await jwtStore.add( user )

  const result = {
    user,
    access_token: accessToken,
  }
  ctx.body = result
}

/**
 * @apiDefine userInformation
 * @apiSuccess {string} id the user id
 * @apiSuccess {string} email the user email
 * @apiSuccess {string} name the user name
 * @apiSuccess {string} address the user address
 * @apiSuccess {string} lang the user language, either `en` or `fr`
 * @apiSuccess {string} currency the user currency, either `USD` or `EUR`
 * @apiSuccess {object} quotationConfig the user quotations' configuration
 * @apiSuccess {number} quotationConfig.creationCount the user number of quotations
 * @apiSuccess {string} quotationConfig.prefix the user default quotation reference prefix
 * @apiSuccess {number} quotationConfig.tax the user default tax rate
 * @apiSuccess {string} quotationConfig.mentions the user default quotation mentions
 * @apiSuccess {object} invoiceConfig the user invoices' configuration
 * @apiSuccess {number} invoiceConfig.creationCount the user number of invoices
 * @apiSuccess {string} invoiceConfig.prefix the user default invoice reference prefix
 * @apiSuccess {string} invoiceConfig.mentions the user default invoices mentions
 * @apiSuccess {object} productConfig the user product's configuration
 * @apiSuccess {number} productConfig.quantity the user default products quantity
 * @apiSuccess {number} productConfig.price the user default products price
 */

//////
// PUBLIC
//////

/**
 * @api {post} /account/register register
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiDescription register an account
 * @apiGroup Account
 *
 * @apiParam (Request body) {string} email email
 * @apiParam (Request body) {string} redirectUrl the url of the password form
 *
 * @apiSuccess {string} email the user email
 * @apiSuccess {boolean} new always `true`
 */
publicRouter
.post( `/register`, async (ctx, next) => {
  const { body }  = ctx.request
  const { email } = body
  const data = merge( { email }, {
    quotationConfig: {},
    invoiceConfig  : {},
    productConfig  : {},
  })
  const user = await User.create( data, {
    include: [
      QuotationConfig,
      InvoiceConfig,
      ProductConfig,
    ]
  })

  await user.resetPassword( body.redirectUrl )
  ctx.body = {
    email:  user.email,
    new:    true,
  }
})
/**
 * @api {post} /account/login login
 * @apiVersion 1.0.0
 * @apiName login
 * @apiDescription login to an account
 * @apiGroup Account
 *
 * @apiParam (Request body) {string} email email
 * @apiParam (Request body) {string} password password
 *
 * @apiSuccess {object} user the user
 * @apiSuccess {string} access_token the access token
 */
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
/**
 * @api {post} /account/forgot forgot
 * @apiVersion 1.0.0
 * @apiName forgot
 * @apiDescription sent an email to reset the password
 * @apiGroup Account
 *
 * @apiParam (Request body) {string} email the email which will receive the reset link
 * @apiParam (Request body) {string} redirectUrl the url of the reset form.
 * <br> A query parameter named `token` with its value will be added to the redirect Url.
 * <br> This should be passed in the from body when posting to /account/reset
 *
 * @apiSuccess {string} email the user email
 * @apiSuccess {boolean} reset always true
 */
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
  ctx.body = {
    email: user.email,
    reset: true,
  }
})
/**
 * @api {post} /account/set-password set password
 * @apiVersion 1.0.0
 * @apiName set password
 * @apiDescription set a new password
 * @apiGroup Account
 *
 * @apiParam (Request body) {string} token the token contained in the reset link
 * @apiParam (Request body) {string} password the new password
 *
 * @apiSuccess {object} user the user
 * @apiSuccess {string} access_token the access token
 */
.post( `/set-password`, async (ctx, next) => {
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
  await connectUser( ctx, updatedUser )
})
/**
 * @api {post} /account/reset reset
 * @apiVersion 1.0.0
 * @apiName reset
 * @apiDescription set a new password
 * @apiGroup Account
 *
 * @apiParam (Request body) {string} token the token contained in the reset link
 * @apiParam (Request body) {string} password the new password
 *
 * @apiSuccess {object} user the user
 * @apiSuccess {string} access_token the access token
 */
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

/**
 * @api {get} /account/auth user informations
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetAuth
 * @apiDescription The user informations
 * @apiGroup Account
 *
 * @apiUse userInformation
 */
privateRouter
.get( `/auth`, async (ctx, next) => {
  ctx.assert( ctx.state && ctx.state.user, 401, `Not connected` )
  ctx.body = { user: ctx.state.user }
})
/**
 * @api {get} /account/logout logout
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName Logout
 * @apiDescription remove the access_token
 * @apiGroup Account
 *
 * @apiSuccess {string} message always `bye bye`
 * @apiSuccess {boolean} access_token always an empty string
 */
.get( `/logout`, async (ctx, next) => {
  const { jwtData } = ctx.state
  await jwtStore.remove( jwtData )

  ctx.state.user = null
  ctx.response.set( `authorization`, `` )
  ctx.body = {
    message:      `bye bye`,
    access_token: ``,
  }
})
/**
 * @api {get} /account/statistics statistics
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName Statistics
 * @apiDescription get an overview about the account
 * @apiGroup Account
 *
 * @apiSuccess {number} quotationsCount Total active quotations count
 * @apiSuccess {number} quotationsTotal Total active quotations sums involved
 * @apiSuccess {number} invoicesCount Total active invoice count
 * @apiSuccess {number} invoicesTotal  Total active invoices sums involved
 * @apiSuccess {number} invoicesTotalPaid Total active paid invoices sums involved
 * @apiSuccess {number} invoicesTotalLeft Total active left invoices sums involved
 */
.get( `/statistics`, async (ctx, next) => {
  const { userId }  = ctx.state
  const user        = await User.findOne({
    where: {
      id:             userId,
      isDeactivated:  { $not: true },
    },
    attributes: [
      ...dbColumns.statistics,
    ]
  })
  ctx.body = user
})
/**
 * @api {post} /account/settings settings
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName Settings
 * @apiDescription update user informations
 * @apiGroup Account
 *
 * @apiParam (Request body) {object} user the user form values
 *
 * @apiUse userInformation
 */
.post( `/settings`, async (ctx, next) => {
  const { id }      = ctx.state && ctx.state.user
  const { body }    = ctx.request
  const queryParams = addRelations.user({
    where: { id }
  })
  const instance    = await User.findOne( queryParams )

  ctx.assert(instance, 404, `Can't find User. The associated user isn't found`)
  const updated   = await instance.update( body )

  const relations = [`quotationConfig`, `invoiceConfig`, `productConfig`]
  await Promise.all( relations.map( relationName => {
    return instance[ relationName ].update( body[ relationName ] )
  }))

  const user        = await User.findOne( queryParams )

  const result      = { user }
  ctx.state.user    = result
  ctx.body          = result
})
