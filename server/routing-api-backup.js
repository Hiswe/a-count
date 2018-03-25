import cookie from 'cookie'
import Router from 'koa-router'
import isNil from 'lodash.isnil'

import * as isoFetch from '../shared/iso-fetch'

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
  const method = ctx.request.method.toLowerCase()
  const { response, payload } = await isoFetch[ method ]( fetchOptions, header.cookie )
  if (!response.ok) {
    throw({
      status:     response.status,
      statusText: response.statusText,
      message:    `[FROM API] ${payload.message}`,
      stacktrace: response.stacktrace,
    })
  }

  // If the API send an authorization header, copy it to a cookie
  // • needed to maintain authentication without JS activated
  const authorization = response.headers.get( `authorization` )
  // copy authorization header even if it's an empty string
  if ( !isNil( authorization ) ) {
    const jwt = authorization.replace( `Bearer `, `` )
    ctx.cookies.set( `concompte:api`, jwt )
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
.post( `/users/:id`, proxyRequest, async (ctx, next) => {
  const { payload } = ctx.state
  ctx.redirect( `/profile` )
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
// app.post('/quotation/convert-to-invoice/:fakeId', quotation.convert);

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

export { router as default }
