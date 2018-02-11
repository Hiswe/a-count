import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
// Redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import routes from '../shared/routes'
import asyncMiddleware from './express-async-middleware'
import reducer from '../shared/ducks/combined-reducers.js'

const router = express.Router();

const store = createStore(reducer, {}, applyMiddleware(thunk))

async function reactRoutingToExpress(req, res) {

  // wait for every component to fetch his data
  const branch      = matchRoutes(routes, req.url)
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
      <StaticRouter location={req.url} context={context}>
        {/* renderRoutes will render the right components */}
        { renderRoutes(routes) }
      </StaticRouter>
    </Provider>
  )

  // reflect status from react-router to express
  if (context.status === 302) {
    return res.redirect(302, context.url)
  }
  if (context.status === 404) {
    res.status(404)
  }
  res.render(`_layout`, {
    initialState: store.getState(),
    dom: content,
  })
}

router.get('*', asyncMiddleware( reactRoutingToExpress ))

export { router as default }
