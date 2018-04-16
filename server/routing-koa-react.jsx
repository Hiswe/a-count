import chalk from 'chalk'
import Router from 'koa-router'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Helmet } from 'react-helmet'

import log from './log.js'
import * as render from './render'
import routes from '../shared/routes.js'
import reducer from '../shared/ducks/combined-reducers.js'

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

const store = createStore(reducer, {}, applyMiddleware(thunk, reduxActionLogger))

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
        params  : match.params,
        cookie  : header.cookie,
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
  // render tags outside the app (meta, links…)
  // • https://www.npmjs.com/package/react-helmet#server-usage
  const helmet = Helmet.renderStatic()

  // reflect status from react-router to koa
  if ( staticContext.status === 302 ) {
    ctx.status = 302
    log( `redirect` )
    return ctx.redirect( staticContext.url )
  }
  if ( staticContext.status === 404 ) {
    ctx.status = 404
  }

  ctx.body = render.reactApp({
    store,    // those will be used to initialize the store client side
    content,  // the right HTML produced by react ^^
    helmet,   // for HEAD tags
  })
})

export { router as default }
