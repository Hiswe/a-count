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
const VERSION = require('./api-versions').V1_1

const apiRouter = new Router({
  prefix: VERSION.prefix,
})
module.exports = apiRouter

apiRouter.get(`/`, routerCommon.root(VERSION.number))
apiRouter.use(routerAccount[VERSION.number].public.routes())

apiRouter.use(routerCommon.jwt)
apiRouter.use(routerCommon.isAuthorizedRoute)
apiRouter.use(routerCommon.getDefaultQueryParams)

apiRouter.use(routerAccount[VERSION.number].private.routes())
apiRouter.use(routerCustomers.routes())
apiRouter.use(routerQuotations.routes())
apiRouter.use(routerInvoices.routes())
