import { inspect } from 'util'
import Router from 'koa-router'

import { formatResponse } from './_helpers'
import routerCustomers from './router-customers'
import routerQuotations from './router-quotations'

const apiRouter = new Router({
  // TODO should have a prefix
  // prefix: `/v1`,
})

//----- ERRORS

apiRouter.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log( inspect(err.original ? err.original : err, {colors: true, depth: 1}) )
    ctx.status  = err.statusCode || err.status || 500
    const { status }  = ctx
    const { message } = err
    ctx.body    = Object.assign(
      formatResponse({
        error: true,
        status,
        message,
      }), {
      message,
      stacktrace: err.stacktrace || err.stack || false,
    })
  }
})

//----- API INFOS

apiRouter
.get( `/`, (ctx, next) => {
  ctx.body = formatResponse()
})

//----- MOUNT

apiRouter.use( routerCustomers.routes() )
apiRouter.use( routerQuotations.routes() )

export default apiRouter
