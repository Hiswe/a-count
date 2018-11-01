'use strict'

const Router = require('koa-router')

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