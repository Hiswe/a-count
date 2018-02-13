import path from 'path'
import { URL } from 'url'
import 'isomorphic-fetch'
import chalk from 'chalk'
import moment from 'moment'
import { inspect } from 'util'
import Koa from 'koa'
import bodyParser from 'koa-body'
import serveStatic from 'koa-static'
import compress from 'koa-compress'
import logger  from 'koa-logger'
import views from 'koa-views'
import json from 'koa-json'
import Router from 'koa-router'
import session from 'koa-session'

import config from '../shared/config'
import { sequelize } from '../db'
import reactRoutes from './koa-react-routing'

//////
// SERVER CONFIG
//////

const app     = new Koa()
const router  = new Router()

app.use( bodyParser() )
app.use( compress() )
app.use( serveStatic(path.join(__dirname, `../public`)) )

// format json https://github.com/koajs/json
app.use( json() )
// templates
// even if React is used for the most part…
// …Pug is still used for wrappers & error
app.use( views(path.join( __dirname, `./views`), {extension: `pug`}) )

//----- LOGGING

app.use( logger() )

//----- SESSIONS

app.keys = [`con con con compte`]
const sessionConfig = {
  renew: true,
}
app.use( session(sessionConfig, app) )

//////
// ROUTING
//////

//----- API

import api from '../db/api'

router.use( `/api/v1`, api.routes() )

//----- ERROR HANDLING

router.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    console.log( inspect(err, {colors: true}) )
    await ctx.render(`error/default`, {
      reason: err.message,
      stacktrace: err.stacktrace || err.stack || false,
    })
  }
})

//----- NO-JS BACKUP

const proxyRequest = async (ctx, next) => {
  const { url, body } = ctx.request
  const apiCallUrl    = new URL( config.apiEndpoint )
  apiCallUrl.pathname = apiCallUrl.pathname + url
  const fetchResult   = await fetch( apiCallUrl.href,  {
    method:   `POST`,
    headers:  { 'Content-Type': `application/json` },
    body:     JSON.stringify( body ),
  })
  const result      = await fetchResult.json()
  // take care of response errors
  if (!fetchResult.ok) {
    throw({
      status:     fetchResult.status,
      statusText: fetchResult.statusText,
      message:    result.message,
      stacktrace: result.stacktrace,
    })
  }
  ctx.state.result = result
  next()
}
// app.post('/quotation/add-line',                   quotation.addLine);
// app.post('/quotation/remove-line',                quotation.removeLine);
// app.post('/quotation/recompute',                  quotation.recompute);
// app.post('/quotation/convert-to-invoice/:fakeId', quotation.convert);
// app.post('/quotation/:fakeId?',                   quotation.post);

router.post( `/customers/new`, proxyRequest, async (ctx, next) => {
  const { result } = ctx.state
  ctx.redirect( `/customers/${ result.id }` )
})
router.post( `/customers/:id`, proxyRequest, async (ctx, next) => {
  const { url } = ctx.request
  ctx.redirect( ctx.request.url )
})


// app.post('/reset',    reset.post);

// // http://maxlapides.com/forcing-browsers-print-backgrounds/
// // TODO should be handled by react?
// app.get('/print/:fakeId', print.get);

//----- MOUNT REACT ROUTER

router.use( reactRoutes.routes() )

router.use( async (ctx) => {
  ctx.status = 404
  await ctx.render(`error/404`)
})

//----- MOUNT ROUTER TO APPLICATION

app.use( router.routes() )

//////
// EXPORTS
//////

export {app as default}
