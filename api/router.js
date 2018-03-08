'use strict'

const { inspect } = require( 'util' )
const omit = require( 'lodash.omit' )
const merge = require( 'lodash.merge' )
const moment = require( 'moment' )
const Router = require( 'koa-router' )

const redis = require( './redis' )
const { formatResponse } = require( './_helpers' )
const routerUsers = require( './router-users' )
const routerCustomers = require( './router-customers' )
const routerQuotations = require( './router-quotations' )
const config = require( './config' )
const User = require( './db/model-user' )
const { normalizeString } = require( './db/_helpers' )

const apiRouter = new Router({
  // TODO: should have a prefix
  // prefix: `/v1`,
})
module.exports = apiRouter

//----- ERRORS

apiRouter.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log( inspect(err.original ? err.original : err, {colors: true, depth: 1}) )
    ctx.status  = err.statusCode || err.status || 500
    const { status }  = ctx
    const { message } = err
    ctx.body = formatResponse({
      error: true,
      status,
      message,
      stacktrace: err.stacktrace || err.stack || false,
    })
  }
})

//----- API INFOS

apiRouter
.get( `/`, (ctx, next) => {
  ctx.body = formatResponse()
})

//----- AUTHENTICATION

apiRouter.post(`/register`, async (ctx, next) => {
  // 308 to redirect with a POST
  // https://github.com/koajs/koa/issues/1057#issuecomment-329182602
  ctx.status = 308
  ctx.redirect( `/users/new` )
})

apiRouter.post(`/login`, async (ctx, next) => {
  ctx.status = 308
  ctx.redirect( `/users/auth` )
})

apiRouter.get(`/logout`, async (ctx, next) => {
  ctx.session = null
  ctx.body = formatResponse({ message: `bye bye` })
})

// authentication guard middleware
apiRouter.use( async (ctx, next) => {
  ctx.assert( ctx.session && ctx.session.user, 401, `Not connected` )
  await next()
})

//----- MOUNT

apiRouter.use( routerUsers.routes() )
apiRouter.use( routerCustomers.routes() )
apiRouter.use( routerQuotations.routes() )
