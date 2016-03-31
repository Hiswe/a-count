import React                from 'react'
import { renderToString }   from 'react-dom/server'
// react-router need history module
import {
  RouterContext,
  match }                   from 'react-router'
// Redux
import { createStore }      from 'redux'
import { Provider }         from 'react-redux'


import { getInitialState }  from '../db'
import routes               from '../shared/react-routes'
import reducer              from '../shared/redux-reducers'
// import { setFakeId }        from '../shared/_format'

function reactRoutingMiddleware(req, res, next) {
  const location  = req.url;

  match({routes, location }, function (error, redirectLocation, renderProps) {
    if (error) return next(err)
    if (redirectLocation) {
      return res.redirect(redirectLocation.pathname + redirectLocation.search)
    }
    if (!renderProps) return next()
    getInitialState()
      .then( initialState => {
        // Redux store init!
        const store     = createStore(reducer, initialState);
        return res.render('_layout', {
          dom: renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          ),
          // send initial state for front app initialization
          initialState
        })
      })
      .catch(next)
  });
}

export {reactRoutingMiddleware as default }
