'use strict'

const merge = require('lodash.merge')
const Router = require('koa-router')

const config = require('./config')
const addRelations = require('./utils/db-default-relations')
const dbColumns = require('./utils/db-sub-queries')
const log = require('./utils/log')
const dbGetterSetter = require('./utils/db-getter-setter')
const User = require('./db/model-user')
const QuotationConfig = require('./db/model-quotation-config')
const InvoiceConfig = require('./db/model-invoice-config')
const ProductConfig = require('./db/model-product-config')
const jwtStore = require('./jwt-store')
const MESSAGES = require('./utils/error-messages')
const versions = require('./api-versions')
const V1 = versions.V1.number
const V1_1 = versions.V1_1.number

const prefix = `account`

const routers = {
  [V1]: {
    public: new Router({ prefix: `/${prefix}` }),
    private: new Router({ prefix: `/${prefix}` }),
  },
  [V1_1]: {
    public: new Router({ prefix: `/${prefix}` }),
    private: new Router({ prefix: `/${prefix}` }),
  },
}
const methods = {
  [V1]: {},
  [V1_1]: {},
}

module.exports = {
  [V1]: {
    public: routers[V1].public,
    private: routers[V1].private,
  },
  [V1_1]: {
    public: routers[V1_1].public,
    private: routers[V1_1].private,
  },
}

//----- UTILS

async function connectUser(ctx, user) {
  const { id } = user
  const queryParams = addRelations.user({
    where: { id },
  })
  user = await User.findOne(queryParams)

  const accessToken = await jwtStore.add(user)

  const result = {
    user,
    access_token: accessToken,
  }
  ctx.body = result
}

/**
 * @apiDefine userInformation
 * @apiSuccess {object} user the user
 * @apiSuccess {string} user.id the user id
 * @apiSuccess {string} user.email the user email
 * @apiSuccess {string} user.name the user name
 * @apiSuccess {string} user.address the user address
 * @apiSuccess {string} user.lang the user language, either `en` or `fr`
 * @apiSuccess {string} user.currency the user currency, either `USD` or `EUR`
 * @apiSuccess {object} user.quotationConfig the user quotations' configuration
 * @apiSuccess {number} user.quotationConfig.creationCount the user number of quotations
 * @apiSuccess {string} user.quotationConfig.prefix the user default quotation reference prefix
 * @apiSuccess {number} user.quotationConfig.tax the user default tax rate
 * @apiSuccess {string} user.quotationConfig.mentions the user default quotation mentions
 * @apiSuccess {object} user.invoiceConfig the user invoices' configuration
 * @apiSuccess {number} user.invoiceConfig.creationCount the user number of invoices
 * @apiSuccess {string} user.invoiceConfig.prefix the user default invoice reference prefix
 * @apiSuccess {string} user.invoiceConfig.mentions the user default invoices mentions
 * @apiSuccess {object} user.productConfig the user product's configuration
 * @apiSuccess {number} user.productConfig.quantity the user default products quantity
 * @apiSuccess {number} user.productConfig.price the user default products price
 */

/**
 * @apiDefine userNotFound user not found
 *  the user is not found
 * @apiError (Error 404) {boolean} error <code>true</code>
 * @apiError (Error 404) {number} status 404
 * @apiError (Error 404) {string} message user-not-found
 */

/**
 * @apiDefine invalidPassword invalid password
 *  the password is invalid
 * @apiError (Error 400) {boolean} error <code>true</code>
 * @apiError (Error 400) {number} status 400
 * @apiError (Error 400) {string} message invalid-password
 */

//////
// PUBLIC
//////

/**
 * @api {post} /v1/account/register register
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

methods[V1].register = async (ctx, next) => {
  const { body } = ctx.request
  const { email } = body
  const data = merge(
    { email },
    {
      quotationConfig: {},
      invoiceConfig: {},
      productConfig: {},
    },
  )
  const user = await User.create(data, {
    include: [QuotationConfig, InvoiceConfig, ProductConfig],
  })

  await user.resetPassword(body.redirectUrl)
  ctx.body = {
    email: user.email,
    new: true,
  }
}

/**
 * @api {post} /v1.1/account/register register
 * @apiVersion 1.1.0
 * @apiName Register
 * @apiDescription register an account
 * @apiGroup Account
 *
 * @apiParam (Request body) {string} email email
 *
 * @apiSuccess {string} email the user email
 * @apiSuccess {boolean} new always `true`
 */
methods[V1_1].register = async (ctx, next) => {
  const { body } = ctx.request
  const { email } = body
  const data = merge(
    { email },
    {
      quotationConfig: {},
      invoiceConfig: {},
      productConfig: {},
    },
  )
  const user = await User.create(data, {
    include: [QuotationConfig, InvoiceConfig, ProductConfig],
  })

  await user.resetPasswordTokenOnly()
  ctx.body = {
    email: user.email,
    new: true,
  }
}

/**
 * @api {post} /v1/account/login login
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
 *
 * @apiUse userNotFound
 *
 * @apiUse invalidPassword
 *
 */
methods[V1].login = async (ctx, next) => {
  const { body } = ctx.request
  const user = await User.findOne({
    where: {
      email: dbGetterSetter.normalizeString(body.email),
      isDeactivated: { $not: true },
    },
  })
  ctx.assert(user, 404, MESSAGES.NO_USER)

  const isPasswordValid = await user.comparePassword(body.password)
  ctx.assert(isPasswordValid, 401, MESSAGES.INVALID_PASSWORD)

  await connectUser(ctx, user)
}

/**
 * @api {post} /v1.1/account/login login
 * @apiVersion 1.1.0
 * @apiName login
 * @apiDescription login to an account
 * @apiGroup Account
 *
 * @apiParam (Request body) {string} email email
 * @apiParam (Request body) {string} password password
 *
 * @apiUse userInformation
 * @apiSuccess {string} access_token the access token
 *
 * @apiUse userNotFound
 *
 * @apiUse invalidPassword
 *
 */
methods[V1_1].login = async (ctx, next) => {
  const { body } = ctx.request
  const user = await User.findOne({
    where: {
      email: dbGetterSetter.normalizeString(body.email),
      isDeactivated: { $not: true },
    },
  })
  ctx.assert(user, 404, MESSAGES.NO_USER)

  const isPasswordValid = await user.comparePassword(body.password)
  ctx.assert(isPasswordValid, 400, MESSAGES.INVALID_PASSWORD)

  await connectUser(ctx, user)
}

/**
 * @api {post} /v1/account/forgot forgot
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
async function forgot(ctx, next) {
  const { body } = ctx.request
  const user = await User.findOne({
    where: {
      email: body.email,
      isDeactivated: { $not: true },
    },
  })
  ctx.assert(user, 404, MESSAGES.EMAIL_NOT_FOUND)

  await user.resetPassword(body.redirectUrl)
  ctx.body = {
    email: user.email,
    reset: true,
  }
}

/**
 * @api {post} /v1/account/set-password set password
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
async function setPassword(ctx, next) {
  const { body } = ctx.request
  const user = await User.findOne({
    where: {
      isDeactivated: { $not: true },
      token: body.token,
      tokenExpire: { $gt: Date.now() },
    },
  })
  ctx.assert(user, 404, MESSAGES.TOKEN_EXPIRED)

  const updatedUser = await user.setPassword(body.password)
  await connectUser(ctx, updatedUser)
}

/**
 * @api {post} /v1/account/reset reset
 * @apiVersion 1.0.0
 * @apiName reset
 * @apiDescription set a new password
 * @apiGroup Account
 *
 * @apiParam (Request body) {string} token the token contained in the reset link
 * @apiParam (Request body) {string} password the new password
 *
 * @apiUse userInformation
 * @apiSuccess {string} access_token the access token
 */
async function reset(ctx, next) {
  const { body } = ctx.request
  const user = await User.findOne({
    where: {
      isDeactivated: { $not: true },
      token: body.token,
      tokenExpire: { $gt: Date.now() },
    },
  })
  ctx.assert(user, 404, MESSAGES.TOKEN_EXPIRED)

  const updatedUser = await user.setPassword(body.password)
  await jwtStore.removeAllFromUser(user.id)
  await connectUser(ctx, updatedUser)
}

routers[V1].public
  .post(`/register`, methods[V1].register)
  .post(`/login`, methods[V1].login)
  .post(`/forgot`, forgot)
  .post(`/set-password`, setPassword)
  .post(`/reset`, reset)

routers[V1_1].public
  .post(`/register`, methods[V1_1].register)
  .post(`/login`, methods[V1_1].login)
  .post(`/forgot`, forgot)
  .post(`/set-password`, setPassword)
  .post(`/reset`, reset)

//////
// PRIVATE
//////

/**
 * @api {get} /v1/account/auth authenticated user
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetAuth
 * @apiDescription The user informations
 * @apiGroup Account
 *
 * @apiDeprecated remove in >= V1.1. Use /account/me
 *
 * @apiUse userInformation
 */

async function auth(ctx, next) {
  ctx.assert(ctx.state && ctx.state.user, 401, MESSAGES.NOT_CONNECTED)
  ctx.body = { user: ctx.state.user }
}

/**
 * @api {get} /v1.1/account/me current user
 * @apiVersion 1.1.0
 * @apiPermission user
 * @apiName Me
 * @apiDescription The user informations
 * @apiGroup Account
 *
 * @apiUse userInformation
 */

async function me(ctx, next) {
  ctx.assert(ctx.state && ctx.state.user, 401, MESSAGES.NOT_CONNECTED)
  ctx.body = { user: ctx.state.user }
}

/**
 * @api {get} /v1/account/logout logout
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName Logout
 * @apiDescription remove the access_token
 * @apiGroup Account
 *
 * @apiSuccess {string} message always `bye bye`
 * @apiSuccess {boolean} access_token always an empty string
 */
async function logout(ctx, next) {
  const { jwtData } = ctx.state
  await jwtStore.remove(jwtData)

  ctx.state.user = null
  ctx.response.set(`authorization`, ``)
  ctx.body = {
    message: `bye bye`,
    access_token: ``,
  }
}
/**
 * @api {get} /v1/account/statistics statistics
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

async function statistics(ctx, next) {
  const { userId } = ctx.state
  const user = await User.findOne({
    where: {
      id: userId,
      isDeactivated: { $not: true },
    },
    attributes: [...dbColumns.statistics],
  })
  ctx.body = user
}

/**
 * @api {post} /v1/account/settings settings
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName Settings
 * @apiDescription update user informations
 * @apiGroup Account
 *
 * @apiParam (Request body) {object} user the user form values
 *
 * @apiUse userInformation
 * @apiUse userNotFound
 */

async function settings(ctx, next) {
  const { id } = ctx.state && ctx.state.user
  const { body } = ctx.request
  const queryParams = addRelations.user({
    where: { id },
  })
  const instance = await User.findOne(queryParams)

  ctx.assert(instance, 404, MESSAGES.NO_USER)
  const updated = await instance.update(body)

  const relations = [`quotationConfig`, `invoiceConfig`, `productConfig`]
  await Promise.all(
    relations.map(relationName => {
      return instance[relationName].update(body[relationName])
    }),
  )

  const user = await User.findOne(queryParams)

  const result = { user }
  ctx.state.user = result
  ctx.body = result
}

routers[V1].private
  .get(`/auth`, auth)
  .get(`/logout`, logout)
  .get(`/statistics`, statistics)
  .post(`/settings`, settings)

routers[V1_1].private
  .get(`/me`, me)
  .get(`/logout`, logout)
  .get(`/statistics`, statistics)
  .post(`/settings`, settings)
