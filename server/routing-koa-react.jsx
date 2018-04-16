import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import serializeJS from 'serialize-javascript'
import Router from 'koa-router'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import IntlPolyfill from 'intl'
import areIntlLocalesSupported from 'intl-locales-supported'
import { Helmet } from 'react-helmet'

import log from './log.js'
import config from './config.js'
import routes from '../shared/routes.js'
import reducer from '../shared/ducks/combined-reducers.js'

// I18N SETUP
// • node only has `en` locales
// • polyfill the other languages
//   https://formatjs.io/guides/runtime-environments/#polyfill-node
if ( !areIntlLocalesSupported([`en`, `fr`]) ) {
  Intl.NumberFormat   = IntlPolyfill.NumberFormat
  Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
}

const SVG_ICONS_PATH = path.join(__dirname, './svg-icons.svg')
const router         = new Router()

// simple server side action logger
// • for the creation of a custom middleware see:
//   https://redux.js.org/api-reference/applymiddleware#example:-custom-logger-middleware
const reduxActionLogger = ({ getState }) => {
  return next => action => {
    log( `dispatch →`, action.type )
    const returnValue = next( action )
    const hasError = returnValue.payload.error
    const color = hasError ? chalk.red : chalk.green
    log( `dispatch ←`, color(action.type) )
    return returnValue
  }
}

const store         = createStore(reducer, {}, applyMiddleware(thunk, reduxActionLogger))

// only pass a subset of the config. enough for the client side
// • Use serialize-javascript over JSON.stringify()
//   https://www.npmjs.com/package/serialize-javascript#overview
const clientConfig  = serializeJS( {
  API_URL:          config.API_URL,
  API_COOKIE_NAME:  config.API_COOKIE_NAME,
  HOST_URL:         config.HOST_URL,
  APP_NAME:         config.APP_NAME,
}, { isJSON: true } )

const svgIcons = fs.readFileSync( SVG_ICONS_PATH, `utf8`)
function render( { store, content, helmet} ) {
  return `
<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    ${ helmet.title.toString() }
    ${ helmet.meta.toString() }
    ${ helmet.link.toString() }
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    ${ svgIcons }
    <div id="react-main-mount">${ content }</div>
    <script>
      window.__CONFIG__ = ${ clientConfig }
      window.__INITIAL_STATE__ = ${ serializeJS( store.getState(), { isJSON: true } ) }
    </script>
    <script src="/vendor.concompte.js"></script>
    <script src="/concompte.js"></script>
  </body>
</html>`
}

router.get( '*', async (ctx, next) => {
  const { url, header } = ctx
  // wait for every component to fetch his data
  const branch      = matchRoutes(routes, url)
  const initFetches = branch
    .filter( ({route}) => route.component.fetchData instanceof Function )
    .map( ({route, match}) => {
      // Pass here the cookies
      // fetch will need it to maintain authentication
      return route.component.fetchData({
        dispatch: store.dispatch,
        params: match.params,
        cookie: header.cookie,
      })
    } )
  await Promise.all( initFetches )

  // staticContext is mutable & provided only on server-side rendering
  // • Because it's mutable, it will change during the React's server rendering process
  // • So that's a good way to pass data from react-router-config to the server
  const staticContext = {}

  // Finally render!
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={staticContext}>
        {/* renderRoutes will render the right components */}
        { renderRoutes(routes) }
      </StaticRouter>
    </Provider>
  )
  // render HEAD tags
  // • https://www.npmjs.com/package/react-helmet#server-usage
  const helmet = Helmet.renderStatic()

  // reflect status from react-router to express
  if ( staticContext.status === 302 ) {
    ctx.status = 302
    log( `redirect` )
    return ctx.redirect( staticContext.url )
  }
  if ( staticContext.status === 404 ) {
    ctx.status = 404
  }

  ctx.body = render({
    store,    // those will be used to initialize the store client side
    content,  // the right HTML produced by react ^^
    helmet,   // for HEAD tags
  })
})

export { router as default }
