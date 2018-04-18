'use strict'

const { inspect } = require( 'util'         )
const   omit      = require( 'lodash.omit'  )
const   merge     = require( 'lodash.merge' )
const   moment    = require( 'moment'       )
const   Router    = require( 'koa-router'   )
const   jwt       = require( 'koa-jwt'      )
const   chalk     = require( 'chalk'        )

const config           = require( './config'                     )
const redis            = require( './redis'                      )
const jwtStore         = require( './jwt-store'                  )
const addRelations     = require( './utils/db-default-relations' )
const User             = require( './db/model-user'              )
const routerAccount    = require( './router-account'             )
const routerCustomers  = require( './router-customers'           )
const routerQuotations = require( './router-quotations'          )
const routerInvoices   = require( './router-invoices'            )

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

//----- DEFAULT QUERY PARAMS

const defaultParams = {
  limit: 10,
  page:  1,
  sort:  `updatedAt`,
  dir:   `DESC`,
}
const sortOnRelation = /^[a-z]+\.[a-zA-Z]+$/
const parseSort = sort => {
  if ( !sortOnRelation.test( sort) ) return [ sort ]
  return sort.split(`.`)

}
const ensureDir = dir => [`DESC`, `ASC`].includes( dir ) ? dir : defaultParams.dir

apiRouter.use( async function getDefaultQueryParams( ctx, next) {
  const { query }   = ctx.request
  const dbQuery     = merge( {}, defaultParams, query )
  dbQuery.limit     = parseInt( dbQuery.limit, 10 )
  dbQuery.page      = parseInt( dbQuery.page, 10 )
  dbQuery.offset    = (dbQuery.page - 1) * dbQuery.limit
  // query will crash if ordering on a non valid column…
  // • but a this point we don't anything about the model
  dbQuery.order     = [[
    ...parseSort( dbQuery.sort ),
    ensureDir( dbQuery.dir ),
  ]]
  // remove some unused keys
  const { dir, sort, ...others } = dbQuery
  ctx.state.dbQuery = others
  await next()
})

//----- MOUNT

apiRouter.use( routerAccount.private.routes() )
apiRouter.use( routerCustomers.routes() )
apiRouter.use( routerQuotations.routes() )
apiRouter.use( routerInvoices.routes() )
