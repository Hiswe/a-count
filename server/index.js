import path from 'path'
import { inspect } from 'util'
import chalk from 'chalk'
import moment from 'moment'
import Koa from 'koa'
import bodyParser from 'koa-body'
import serveStatic from 'koa-static'
import compress from 'koa-compress'
import logger from 'koa-logger'
import json from 'koa-json'
import Router from 'koa-router'

import config from './config.js'
import log from './log.js'
import apiBackupRoutes from './routing-api-backup.js'
import reactRoutes from './routing-koa-react.jsx'
import * as render from './render'

//////
// SERVER CONFIG
//////

const app = new Koa()

app.use( bodyParser() )
app.use( compress() )
app.use( serveStatic(path.join(__dirname, `./public`)) )

// format json https://github.com/koajs/json
app.use( json() )

//----- LOGGING

app.use( logger() )

//////
// ROUTING
//////

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
  log( `Server is listening on port`, server.address().port )
})

//////
// EXPORTS
//////

export { app as default }
