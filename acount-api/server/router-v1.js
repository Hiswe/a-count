'use strict'

const Router = require('koa-router')
const cloneDeep = require('lodash.clonedeep')

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

//----- PUBLIC ROUTES

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
apiRouter.use(routerCustomers[VERSION.number].routes())
// https://github.com/alexmingoia/koa-router/issues/244#issuecomment-334874813
apiRouter.use(cloneDeep(routerQuotations).routes())
apiRouter.use(cloneDeep(routerInvoices).routes())
