'use strict'

const { inspect } = require( 'util'         )
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

/**
 * @apiDefine user User access only
 * should send the `access_token` either in the `HEAD Authorization`
 *
 * Bearer eyJhbGc...TJVA95OrMr
 *
 * or in a cookie named `a-count_api`
 */

/**
 * @apiDefine meta
 * @apiSuccess {object} meta meta informations about the list
 * @apiSuccess {number} meta.start starting row
 * @apiSuccess {number} meta.end ending row
 * @apiSuccess {number} meta.total total of rows
 * @apiSuccess {number} meta.limit rows per page
 * @apiSuccess {number} meta.pages total of pages
 * @apiSuccess {number} meta.offset page offset
 * @apiSuccess {number} meta.currentPage the current page number
 * @apiSuccess {boolean} meta.previousPage if there's a previous page
 * @apiSuccess {boolean} meta.nextPage if there's a next page
 */

//----- PUBLIC ROUTES

/**
 * @api {get} / root
 * @apiVersion 1.0.0
 * @apiName GetVersion
 * @apiDescription get some datas
 * @apiGroup Public
 *
 * @apiSuccess {string} name the name of the API
 * @apiSuccess {version} version the version of the API
 */
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
  cookie: config.jwt.cookieName,
}) )

// confront them to DB
apiRouter.use( async function isAuthorizedRoute(ctx, next) {
  const { jwtData } = ctx.state
  const userId      = await jwtStore.check( jwtData )
  ctx.assert( userId, 401, `Not connected – token invalid` )

  const userQuery = addRelations.user({
    where: { id: userId },
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
