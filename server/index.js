import path from 'path'
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

import config from '../shared/config'
import { sequelize } from '../db'
import reactRoutes from './koa-react-routing'

//////
// SERVER CONFIG
//////

const app = new Koa()
const router = new Router()

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

//////
// ROUTING
//////

//----- API

import api from '../db/api'

router.use( `/api/v1`, api.routes() )

// //----- NO-JS BACKUP

// app.post('/quotation/add-line',                   quotation.addLine);
// app.post('/quotation/remove-line',                quotation.removeLine);
// app.post('/quotation/recompute',                  quotation.recompute);
// app.post('/quotation/convert-to-invoice/:fakeId', quotation.convert);
// app.post('/quotation/:fakeId?',                   quotation.post);

// app.post( '/customer/:customerId?',  customer.post);
// app.post( `/customers/new`,          customer.create )

// app.post('/reset',    reset.post);

// // http://maxlapides.com/forcing-browsers-print-backgrounds/
// // TODO should be handled by react?
// app.get('/print/:fakeId', print.get);

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

//----- MOUNT REACT ROUTER

router.use( reactRoutes.routes() )

//----- MOUNT ROUTER TO APPLICATION

app.use( router.routes() )

//////
// EXPORTS
//////

export {app as default}
