import React from 'react'

import * as account from './redux-ducks/account'

// ROUTE FETCH ACTIONS
// • we need to collect data for the components to render properly
//   …both on the server and the client side
// • the static “fetchData” is mainly dedicated to the server
//   but we alias it for the client side with _fetchDataOnClient :)
// • BUT we don't want those data to be fetch another time on client side initialization
//   hence the SKIP_FIRST_COMPONENTDIDMOUNT
// • coming from:
//   https://reactjsnews.com/isomorphic-react-in-real-life#data-fetching

let SKIP_FIRST_COMPONENTDIDMOUNT = true

export default function pageFetchActions({ Component, actionCreators }) {
  // be sure we have an array to begin with
  actionCreators = Array.isArray(actionCreators)
    ? actionCreators
    : [actionCreators]
  // always query the authentication
  actionCreators.unshift(account.auth)

  return class pageFetchActions extends React.PureComponent {
    // Don't pass the full store
    // • passing only dispatch will make server & client iso in what they get
    static fetchData({ dispatch, params = {}, query = {}, jwt }) {
      return Promise.all(
        actionCreators.map(actionCreator => {
          return dispatch(actionCreator(params, jwt))
        }),
      )
    }

    componentDidUpdate(prevProps) {
      const { location } = this.props
      const { location: prevLocation } = prevProps

      const isUrlChanged =
        location.pathname !== prevLocation.pathname ||
        location.search !== prevLocation.search

      if (isUrlChanged) this._fetchDataOnClient()
    }

    componentDidMount() {
      if (!SKIP_FIRST_COMPONENTDIDMOUNT) return this._fetchDataOnClient()
      SKIP_FIRST_COMPONENTDIDMOUNT = false
    }

    _fetchDataOnClient() {
      const { params } = this.props.match
      // call the static method to avoid duplicating code
      // • don't need to pass the JWT:
      //   it will be handled by isomorphic-fetch on the client side
      pageFetchActions.fetchData({
        dispatch: this.props.dispatch,
        params,
      })
    }

    render() {
      return <Component {...this.props} />
    }
  }
}
