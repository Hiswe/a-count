import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { createStore,  applyMiddleware } from 'redux'
import crio from 'crio'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'

import routes from '../shared/routes'
import reducers from '../shared/ducks/combined-reducers'

const $root             = document.querySelector('#react-main-mount')
const initialState      = window.__INITIAL_STATE__ || {}

addLocaleData( [...en, ...fr] )
// Redux combineReducers only accept plain objects
// • We don't want to use any other combine reducer function that handle immutables
// • but we want all the inner values to be immutable
// • hence this code :)
const crioState         = {}
const stateEntries      = Object.entries( initialState )
stateEntries.forEach( ([key, value]) => crioState[ key] = crio(value) )

const middlewares       = [
  thunk,
]
const store = createStore(reducers, crioState, composeWithDevTools(applyMiddleware(...middlewares)))

hydrate((
  <Provider store={store}>
    <BrowserRouter>
      {/* generates routes with react-router-config */}
      { renderRoutes(routes) }
    </BrowserRouter>
  </Provider>
), $root)
