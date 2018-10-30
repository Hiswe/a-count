'use strict'

const Router = require('koa-router')

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
apiRouter.use(routerCustomers.routes())
apiRouter.use(routerQuotations.routes())
apiRouter.use(routerInvoices.routes())
