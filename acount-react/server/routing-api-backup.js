import Router from 'koa-router'
import isNil  from 'lodash.isnil'

import config from './config'
import * as isomorphicFetch from '../shared/isomorphic-fetch'

const router  = new Router()

//////
// NO FETCH BACKUP
//////

// • in case of direct get/post without react handling
// • or JS isn't activated on the client side
// • in any case this is OPTIONAL IF WE want to DEFER everything to the FRONT REACT APP

const proxyRequest = async (ctx, next) => {
  const { url, body, header } = ctx.request
  const fetchOptions = {
    url,
    body,
  }
  const method  = ctx.request.method.toLowerCase()
  const jwt     = ctx.cookies.get( config.COOKIE_NAME )
  const { response, payload } = await isomorphicFetch[ method ]( fetchOptions, jwt )
  if (!response.ok) {
    throw({
      status:     response.status,
      statusText: response.statusText,
      message:    `[FROM API] ${payload.message}`,
      stacktrace: response.stacktrace,
    })
  }

  // If the API send an access token, copy it to a cookie
  // • needed to maintain authentication without JS activated
  const accessToken = payload.access_token
  // copy authorization header even if it's an empty string
  if ( !isNil( accessToken ) ) {
    ctx.cookies.set( config.COOKIE_NAME, accessToken )
    delete payload.access_token
  }

  // Save payload to state for further reuse
  ctx.state.payload = payload
  next()
}

//----- USER

router
.get( `/account/logout`, proxyRequest, async (ctx, next) => {
  const { payload } = ctx.state
  ctx.redirect( `/account/login` )
})
.post( `/account/register`, proxyRequest, async (ctx, next) => {
  const { payload } = ctx.state
  ctx.redirect( `/` )
})
.post( `/account/forgot`, proxyRequest, async (ctx, next) => {
  const { payload } = ctx.state
  ctx.redirect( `/account/forgot` )
})
.post( `/account/reset`, proxyRequest, async (ctx, next) => {
  const { payload } = ctx.state
  ctx.redirect( `/` )
})
.post( `/account/login`, proxyRequest, async (ctx, next) => {
  const { payload } = ctx.state
  ctx.redirect( `/` )
})
.post( `/account/settings`, proxyRequest, async (ctx, next) => {
  const { payload } = ctx.state
  ctx.redirect( ctx.request.url )
})

//----- CUSTOMERS

router
.post( `/customers/new`, proxyRequest, async (ctx, next) => {
  const { payload } = ctx.state
  ctx.redirect( `/customers/${ payload.id }` )
})
.post( `/customers/:id`, proxyRequest, async (ctx, next) => {
  const { url } = ctx.request
  ctx.redirect( ctx.request.url )
})

//----- QUOTATIONS

router
.post( `/quotations/new`, proxyRequest, async (ctx, next) => {
  const { payload } = ctx.state
  ctx.redirect( `/quotations/${ payload.id }` )
})
.post( `/quotations/:id`, proxyRequest, async (ctx, next) => {
  const { url } = ctx.request
  ctx.redirect( ctx.request.url )
})
.post( `/quotations/:id/create-invoice`, proxyRequest, async (ctx, next) => {
  const { id }  = ctx.params
  ctx.redirect( `/quotations/${ id}` )
})

//----- INVOICES

router
.post( `/invoices/:id`, proxyRequest, async (ctx, next) => {
  const { url } = ctx.request
  ctx.redirect( ctx.request.url )
})

export { router as default }
