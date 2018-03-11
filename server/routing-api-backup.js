import cookie from 'cookie'
import Router from 'koa-router'

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
  // copy all received cookies to our response
  // • needed to maintain authentication
  // • response.headers.get('set-cookie') doesn't seem to retrieve all cookies…
  //   should investigate more…
  //   https://github.com/matthew-andrews/isomorphic-fetch/issues/153#issuecomment-346745405
  // • So resolve into getting the raw version of the header:
  //   https://github.com/bitinn/node-fetch/issues/251#issuecomment-287519538
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
  // Save payload to state for further reuse
  ctx.state.payload = payload
  next()
}

//----- USER

router.get( `/logout`, proxyRequest, async (ctx, next) => {
  const { payload } = ctx.state
  ctx.redirect( `/login` )
})
router.post( `/register`, proxyRequest, async (ctx, next) => {
  const { payload } = ctx.state
  ctx.redirect( `/login` )
})
router.post( `/login`, proxyRequest, async (ctx, next) => {
  const { payload } = ctx.state
  ctx.redirect( `/` )
})
router.post( `/users/:id`, proxyRequest, async (ctx, next) => {
  const { payload } = ctx.state
  ctx.redirect( `/profile` )
})

//----- QUOTATIONS

router.post( `/quotations/new`, proxyRequest, async (ctx, next) => {
  const { payload } = ctx.state
  ctx.redirect( `/quotations/${ payload.id }` )
})
router.post( `/quotations/:id`, proxyRequest, async (ctx, next) => {
  const { url } = ctx.request
  ctx.redirect( ctx.request.url )
})
// app.post('/quotation/convert-to-invoice/:fakeId', quotation.convert);

//----- CUSTOMERS

router.post( `/customers/new`, proxyRequest, async (ctx, next) => {
  const { payload } = ctx.state
  ctx.redirect( `/customers/${ payload.id }` )
})
router.post( `/customers/:id`, proxyRequest, async (ctx, next) => {
  const { url } = ctx.request
  ctx.redirect( ctx.request.url )
})

export { router as default }
