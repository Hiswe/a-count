import React                from 'react'
import { renderToString }   from 'react-dom/server'
// react-router need history module
import {
  RouterContext,
  match }                   from 'react-router'
// Redux
import { createStore }      from 'redux'
import { Provider }         from 'react-redux'
import {
  normalize,
  Schema,
  arrayOf }                 from 'normalizr'

import routes               from '../shared/react-routes'
import reducer              from '../shared/redux-reducers'

// https://github.com/gaearon/normalizr
const quotation = new Schema('quotation')

let initialState = {quotations: [
  {id: 13, name: 'pouic'},
  {id: 25, name: 'clapou'},
]}

initialState = normalize(initialState, {
  quotations: arrayOf(quotation)
})

function reactRoutingMiddleware(req, res, next) {
  const location  = req.url;
  const store     = createStore(reducer, initialState);
  match({routes, location }, function (error, redirectLocation, renderProps) {
    if (error) return next(err)
    if (redirectLocation) {
      return res.redirect(redirectLocation.pathname + redirectLocation.search)
    }
    if (!renderProps) return next()
    return res.render('_layout', {
      dom: renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      ),
      initialState
    });
  });
}

export {reactRoutingMiddleware as default }
