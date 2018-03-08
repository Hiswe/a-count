import path from 'path'
import { inspect } from 'util'
import urlJoin from 'url-join'
import chalk from 'chalk'
import moment from 'moment'
import cookie from 'cookie'
import Koa from 'koa'
import bodyParser from 'koa-body'
import serveStatic from 'koa-static'
import compress from 'koa-compress'
import logger  from 'koa-logger'
import views from 'koa-views'
import json from 'koa-json'
import Router from 'koa-router'

import config from './config'
import reactRoutes from './koa-react-routing.jsx'
import { get, post } from '../shared/iso-fetch'

//////
// SERVER CONFIG
//////

const app = new Koa()

app.use( bodyParser() )
app.use( compress() )
app.use( serveStatic(path.join(__dirname, `../public`)) )

// format json https://github.com/koajs/json
app.use( json() )
// templates: even if React is used for the most part…
// …Pug is still used for wrappers & error
app.use( views(path.join( __dirname, `./views`), {extension: `pug`}) )

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
    ctx.status = err.statusCode || err.status || 500
    console.log( inspect(err, {colors: true}) )
    await ctx.render(`error-default`, {
      reason: err.message,
      stacktrace: err.stacktrace || err.stack || false,
    })
  }
})

const router  = new Router()

//----- NO FETCH BACKUP

// • in case of direct post without react handling
// • or JS isn't activated on the client side

const proxyRequest = async (ctx, next) => {
  const { url, body, header } = ctx.request
  const fetchOptions = {
    url,
    body,
  }
  const { response, payload } = await post( fetchOptions, header.cookie )
  if (!response.ok) {
    throw({
      status:     response.status,
      statusText: response.statusText,
      message:    `[FROM API] ${result.message}`,
      stacktrace: response.stacktrace,
    })
  }
  // response.headers.get('set-cookie') doesn't seem to retrieve all cookies…
  // should investigate more…
  // https://github.com/matthew-andrews/isomorphic-fetch/issues/153#issuecomment-346745405
  // So resolve into getting the raw version of the header:
  // https://github.com/bitinn/node-fetch/issues/251#issuecomment-287519538
  const cookies = response.headers.raw()[`set-cookie`]
  if ( Array.isArray(cookies) ) {
    const parsedCookies = cookie.parse(cookies.join(`; `))
    Object
    .entries( parsedCookies )
    .forEach( ([key, value]) => {
      if ([`path`, `expires`].includes(key) ) return
      ctx.cookies.set(key, value, {
        path: parsedCookies.path,
        expires: new Date(parsedCookies.expires),
      })
    })
  }
  ctx.state.result = payload
  next()
}
// app.post('/quotation/convert-to-invoice/:fakeId', quotation.convert);

router.post( `/register`, proxyRequest, async (ctx, next) => {
  const { result } = ctx.state
  ctx.redirect( `/login` )
})
router.post( `/login`, proxyRequest, async (ctx, next) => {
  const { result } = ctx.state
  ctx.redirect( `/` )
})

router.post( `/quotations/new`, proxyRequest, async (ctx, next) => {
  const { result } = ctx.state
  ctx.redirect( `/quotations/${ result.id }` )
})
router.post( `/quotations/:id`, proxyRequest, async (ctx, next) => {
  const { url } = ctx.request
  ctx.redirect( ctx.request.url )
})

router.post( `/customers/new`, proxyRequest, async (ctx, next) => {
  const { result } = ctx.state
  ctx.redirect( `/customers/${ result.id }` )
})
router.post( `/customers/:id`, proxyRequest, async (ctx, next) => {
  const { url } = ctx.request
  ctx.redirect( ctx.request.url )
})

//----- MOUNT REACT ROUTER

router.use( reactRoutes.routes() )

//----- MOUNT ROUTER TO APPLICATION

app.use( router.routes() )
// app.use( router.allowedMethods() )

//----- LAUNCH THE MAGIC

const server = app.listen(config.PORT, function endInit() {
  console.log( `Server is listening on port`, server.address().port )
})

//////
// EXPORTS
//////

export { app as default }
