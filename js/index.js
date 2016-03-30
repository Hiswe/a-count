import React                      from 'react'
import { render }                 from 'react-dom'
import { Router, browserHistory } from 'react-router'

import { createStore }            from 'redux'
import { Provider }               from 'react-redux'
import reducer                    from '../shared/redux-reducers'

import routes         from '../shared/react-routes.jsx'

const $root         = document.querySelector('#react-main-mount')
const initialState  = window.__INITIAL_STATE__ || {}
const store         = createStore(reducer, initialState)
console.log(initialState)


render((
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
), $root)
