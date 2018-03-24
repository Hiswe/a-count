'use strict'

const { inspect } = require( 'util' )
const omit = require( 'lodash.omit' )
const merge = require( 'lodash.merge' )
const moment = require( 'moment' )
const Router = require( 'koa-router' )
const jwt = require( 'koa-jwt' )
const chalk = require( 'chalk' )

const redis = require( './redis' )
const log = require( './_log' )
const formatResponse = require( './_format-response' )
const routerUsers = require( './router-users' )
const routerCustomers = require( './router-customers' )
const routerQuotations = require( './router-quotations' )
const routerAccount = require( './router-account' )
const config = require( './config' )
const User = require( './db/model-user' )
const { normalizeString } = require( './db/_helpers' )

const apiRouter = new Router({
  prefix: `/v1`,
})
module.exports = apiRouter

//----- PUBLIC ROUTES

apiRouter
.get( `/`, (ctx, next) => {
  ctx.body = formatResponse( {
    name:     config.NAME,
    version:  config.VERSION,
  }, ctx )
})

apiRouter.use( routerAccount.public.routes() )

//----- AUTHENTICATION

// extract JWT datas
apiRouter.use( jwt({
  secret: config.jwt.secret,
  key:    `jwtData`,
  cookie: `concompte:api`,
}) )

// confront them to DB
apiRouter.use( async function isAuthorizedRoute(ctx, next) {
  const { jwtData } = ctx.state
  const user = await User.findOneWithRelations({
    where: {
      id:         jwtData.id,
      jwtVersion: jwtData.jwtVersion,
    },
  })
  ctx.assert( user, 401, `Not connected` )
  ctx.state.user = user
  await next()
})

//----- MOUNT

apiRouter.use( routerAccount.private.routes() )
apiRouter.use( routerUsers.routes() )
apiRouter.use( routerCustomers.routes() )
apiRouter.use( routerQuotations.routes() )
