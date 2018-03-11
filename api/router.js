'use strict'

const { inspect } = require( 'util' )
const omit = require( 'lodash.omit' )
const merge = require( 'lodash.merge' )
const moment = require( 'moment' )
const Router = require( 'koa-router' )

const redis = require( './redis' )
const formatResponse = require( './_format-response' )
const routerUsers = require( './router-users' )
const routerCustomers = require( './router-customers' )
const routerQuotations = require( './router-quotations' )
const routerAuth = require( './router-auth' )
const config = require( './config' )
const User = require( './db/model-user' )
const { normalizeString } = require( './db/_helpers' )

const apiRouter = new Router({
  prefix: `/v1`,
})
module.exports = apiRouter

//----- API INFOS

apiRouter
.get( `/`, (ctx, next) => {
  ctx.body = formatResponse( {
    name:     config.NAME,
    version:  config.VERSION,
  }, ctx )
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
