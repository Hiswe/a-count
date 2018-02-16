import chalk from 'chalk'
import { inspect } from 'util'
import Koa from 'koa'
import bodyParser from 'koa-body'
import compress from 'koa-compress'
import morgan from 'koa-morgan'
import json from 'koa-json'
import Router from 'koa-router'
import session from 'koa-session'
import cors from '@koa/cors'

import { formatResponse } from './helpers'
import './db'
import routerCustomers from './router-customers'
import routerQuotations from './router-quotations'

//////
// SERVER CONFIG
//////

const app = new Koa()

app.use( bodyParser() )
app.use( compress() )

// format json https://github.com/koajs/json
app.use( json() )

//----- LOGGING

// to have better logs: don't use the same logger as server
app.use( morgan(`dev`) )

//----- SESSIONS

app.keys = [`api-concompte`]
const sessionConfig = {
  renew: true,
}
app.use( session(sessionConfig, app) )

//----- CORS

app.use(cors())


//////
// ERRORS
//////

app.use(async (ctx, next) => {
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

const apiRouter = new Router()

apiRouter
.get( `/`, (ctx, next) => {
  ctx.body = formatResponse()
})
//////
// MOUNT
//////

apiRouter.use( routerCustomers.routes() )
apiRouter.use( routerQuotations.routes() )

//----- MOUNT ROUTER TO APPLICATION

app.use( apiRouter.routes() )

export { app as default }
