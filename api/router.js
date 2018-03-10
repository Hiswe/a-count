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
const routerAuth = require( './router-auth' )
const config = require( './config' )
const User = require( './db/model-user' )
const { normalizeString } = require( './db/_helpers' )

const apiRouter = new Router({
  // TODO: should have a prefix
  // prefix: `/v1`,
})
module.exports = apiRouter

//----- ERRORS

apiRouter.use( async function handleError(ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.status  = err.statusCode || err.status || 500
    const { status }  = ctx
    const { message } = err
    // only log errors >= 500
    const s = status / 100 | 0
    if (s > 4) {
      console.log( inspect(err.original ? err.original : err, {colors: true, depth: 1}) )
    }
    ctx.body = formatResponse({
      error: true,
      status,
      message,
      stacktrace: err.stacktrace || err.stack || false,
    }, ctx)
  }
})

//----- API INFOS

apiRouter
.get( `/`, (ctx, next) => {
  ctx.body = formatResponse( {}, ctx )
})

//----- AUTHENTICATION

apiRouter.use( routerAuth.routes() )

// authentication guard middleware

apiRouter.use( async function isAuthorizedRoute(ctx, next) {
  ctx.assert( ctx.session && ctx.session.user, 401, `Not connected` )
  await next()
})

//----- MOUNT

apiRouter.use( routerUsers.routes() )
apiRouter.use( routerCustomers.routes() )
apiRouter.use( routerQuotations.routes() )
