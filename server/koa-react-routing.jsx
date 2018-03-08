import Router from 'koa-router'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
// Redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import routes from '../shared/routes'
import reducer from '../shared/ducks/combined-reducers.js'

const router = new Router()

const store = createStore(reducer, {}, applyMiddleware(thunk))

router.get('*', async (ctx, next) => {
  const { url, header }     = ctx
  // wait for every component to fetch his data
  const branch      = matchRoutes(routes, url)
  const initFetches = branch
    .filter( ({route}) => route.component.fetchData instanceof Function )
    .map( ({route, match}) => {
      // Pass here the cookies
      // fetch will need it to maintain authentication
      return route.component.fetchData(store, match.params, header.cookie)
    } )
  await Promise.all( initFetches )

  // context is mutable & provided only on server-side rendering
  // • Because it's mutable, it will change during the server rendering process
  // • So that's a good way to pass router's data here to the server
  const context = {}
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        {/* renderRoutes will render the right components */}
        { renderRoutes(routes) }
      </StaticRouter>
    </Provider>
  )

  // reflect status from react-router to express
  if (context.status === 302) {
    ctx.status = 302
    return ctx.redirect(context.url)
  }
  if (context.status === 404) {
    ctx.status = 404
  }

  await ctx.render(`react-boilerplate`, {
    initialState: store.getState(),
    dom: content,
  })
})

export { router as default }
