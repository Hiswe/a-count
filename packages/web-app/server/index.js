import   path           from 'path'
import { inspect      } from 'util'
import   chalk          from 'chalk'
import   moment         from 'moment'
import   Koa            from 'koa'
import   bodyParser     from 'koa-body'
import   serveStatic    from 'koa-static'
import   compress       from 'koa-compress'
import   logger         from 'koa-logger'
import   json           from 'koa-json'
import   Router         from 'koa-router'
import   enforceHttps   from 'koa-sslify'
import   helmet         from 'koa-helmet'

import config          from './config'
import log             from './log'
import apiBackupRoutes from './routing-api-backup'
import reactRoutes     from './routing-koa-react'
import * as render     from './render'

//////
// SERVER CONFIG
//////

const app = new Koa()

app.use( helmet() )
app.use( bodyParser() )
app.use( compress() )
app.use( serveStatic(path.join(__dirname, `./public`)) )
app.use( json() )
app.use( logger() )

//////
// ROUTING
//////

//----- HTTPS REDIRECT

if ( config.enforceHttps ) app.use( enforceHttps(config.enforceHttps) )

//----- ERROR HANDLING

app.use( async (ctx, next) => {
  try {
    await next()
    // 404 are already handled by REACT
    // no need to render the 404 here ^^
  } catch (err) {
    console.log( inspect(err, {colors: true}) )
    ctx.status  = err.statusCode || err.status || 500
    ctx.body    = render.errorPage({
      reason: err.message,
      stacktrace: err.stacktrace || err.stack || false,
    })
  }
})

const router  = new Router()

//-----  MOUNT NO-FETCH BACKUP

router.use( apiBackupRoutes.routes() )

//----- MOUNT REACT ROUTER

router.use( reactRoutes.routes() )

//----- MOUNT ROUTER TO APPLICATION

app.use( router.routes() )
// app.use( router.allowedMethods() )

//----- LAUNCH THE MAGIC

const server = app.listen(config.PORT, function endInit() {
  console.log(
    `APP Server is listening on port`,
    chalk.cyan(server.address().port),
    `on mode`,
    chalk.cyan(config.NODE_ENV)
  )
})

//////
// EXPORTS
//////

export { app as default }
