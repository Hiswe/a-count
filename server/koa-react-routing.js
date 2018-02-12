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
  const { url }     = ctx
  // wait for every component to fetch his data
  const branch      = matchRoutes(routes, url)
  const initFetches = branch
    .filter( ({route}) => route.component.fetchData instanceof Function )
    .map( ({route, match}) => {
      return route.component.fetchData(store, match.params)
    } )
  await Promise.all( initFetches )

  // render with un updated store
  let context = {} // context is mutable
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
  await ctx.render(`_layout`, {
    initialState: store.getState(),
    dom: content,
  })
})

export { router as default }
