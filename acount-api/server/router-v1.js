'use strict'

const { inspect } = require('util')
const merge = require('lodash.merge')
const moment = require('moment')
const Router = require('koa-router')
const jwt = require('koa-jwt')
const chalk = require('chalk')

const config = require('./config')
const redis = require('./redis')
const jwtStore = require('./jwt-store')
const log = require('./utils/log')
const addRelations = require('./utils/db-default-relations')
const User = require('./db/model-user')
const routerAccount = require('./router-account')
const routerCustomers = require('./router-customers')
const routerQuotations = require('./router-quotations')
const routerInvoices = require('./router-invoices')
const routerCommon = require('./router-common')
const VERSION = require('./api-versions').V1

const apiRouter = new Router({
  prefix: VERSION.prefix,
})
module.exports = apiRouter

/**
 * @apiDefine user User access only
 * should send the `access_token` in the `HEAD Authorization`
 *
 * Bearer eyJhbGc...TJVA95OrMr
 *
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
apiRouter.get(`/`, routerCommon.root(VERSION.number))

apiRouter.use(routerAccount[VERSION.number].public.routes())

//----- AUTHENTICATION

// extract JWT data
apiRouter.use(routerCommon.jwt)

// confront them to DB
apiRouter.use(routerCommon.isAuthorizedRoute)

//----- DEFAULT QUERY PARAMS

apiRouter.use(routerCommon.getDefaultQueryParams)

//----- MOUNT

apiRouter.use(routerAccount[VERSION.number].private.routes())
apiRouter.use(routerCustomers.routes())
apiRouter.use(routerQuotations.routes())
apiRouter.use(routerInvoices.routes())
