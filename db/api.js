import Router from 'koa-router'
import chalk from 'chalk'
import { inspect } from 'util'

import Customer from './model-customer'
import Quotation from './model-quotation'
import { formatResponse } from './api-helpers'
import createRoutes from './api-create-router'

const apiRouter = new Router()

//////
// ERRORS
//////

apiRouter.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log( inspect(err, {colors: true, depth: 1}) )
    ctx.status  = err.statusCode || err.status || 500
    ctx.body    = Object.assign(formatResponse(), {
      message:    err.message,
      stacktrace: err.stacktrace || err.stack || false,
    })
  }
})

//////
// INFOS
//////

apiRouter
.get( `/`, (ctx, next) => {
  ctx.body = formatResponse()
})

//////
// ENTRIES
//////

const customersRoutes = createRoutes( `customers`, Customer )
const quotationsRoutes = createRoutes( `quotations`, Quotation )

//////
// MOUNT
//////

apiRouter.use( customersRoutes.routes() )
apiRouter.use( quotationsRoutes.routes() )

export { apiRouter as default }
