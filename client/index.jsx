import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { createStore,  applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';

import routes from '../shared/routes'
import reducers from '../shared/ducks/combined-reducers'
// import customers from '../shared/ducks/customers'
// import reducer from '../shared/redux-reducers'
// import App from '../shared/app.jsx'

const $root             = document.querySelector('#react-main-mount')
const initialState      = window.__INITIAL_STATE__ || {}
const middlewares       = [
  thunk,
  createLogger(),
]
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

hydrate((
  <Provider store={store}>
    <BrowserRouter>
      {/* generates routes with react-router-config */}
      { renderRoutes(routes) }
    </BrowserRouter>
  </Provider>
), $root)
