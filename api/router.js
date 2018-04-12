'use strict'

const { inspect } = require( 'util'         )
const   omit      = require( 'lodash.omit'  )
const   merge     = require( 'lodash.merge' )
const   moment    = require( 'moment'       )
const   Router    = require( 'koa-router'   )
const   jwt       = require( 'koa-jwt'      )
const   chalk     = require( 'chalk'        )

const config           = require( './config'                )
const redis            = require( './redis'                 )
const jwtStore         = require( './jwt-store'             )
const addRelations     = require( './utils/db-default-relations' )
const User             = require( './db/model-user'         )
const routerAccount    = require( './router-account'        )
const routerCustomers  = require( './router-customers'      )
const routerQuotations = require( './router-quotations'     )
const routerInvoices   = require( './router-invoices'       )

const apiRouter = new Router({
  prefix: `/v1`,
})
module.exports = apiRouter

// 412: Precondition Failed

//----- PUBLIC ROUTES

apiRouter
.get( `/`, (ctx, next) => {
  ctx.body = {
    name:     config.NAME,
    version:  config.VERSION,
  }
})

apiRouter.use( routerAccount.public.routes() )

//----- AUTHENTICATION

// extract JWT data
apiRouter.use( jwt({
  secret: config.jwt.secret,
  key:    `jwtData`,
  cookie: `concompte_api`,
}) )

// confront them to DB
apiRouter.use( async function isAuthorizedRoute(ctx, next) {
  const { jwtData } = ctx.state
  const userId      = await jwtStore.check( jwtData )
  ctx.assert( userId, 401, `Not connected – token invalid` )

  const userQuery = addRelations.user({
    id: userId,
  })
  const user = await User.findOne( userQuery )

  ctx.assert( user, 401, `Not connected – user not found` )
  ctx.state.userId  = userId
  ctx.state.user    = user
  await next()
})

//----- MOUNT

apiRouter.use( routerAccount.private.routes() )
apiRouter.use( routerCustomers.routes() )
apiRouter.use( routerQuotations.routes() )
apiRouter.use( routerInvoices.routes() )
