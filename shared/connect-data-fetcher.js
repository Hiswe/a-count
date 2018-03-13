import React from 'react'

import * as users from './ducks/users'

// Connect data fetcher
// • we need to collect data for the components to render properly
//   …both on the server and the client side
// • the static “fetchData” is mainly dedicated to the server
//   but we alias it for the client side with _fetchDataOnClient :)
// • BUT we don't want those data to be fetch another time on client side initialization
//   hence the IS_FIRST_MOUNT_AFTER_LOAD
// • coming from:
//   https://reactjsnews.com/isomorphic-react-in-real-life#data-fetching

let IS_FIRST_MOUNT_AFTER_LOAD = true

export default function connectDataFetchers({Component, actionCreators}) {

  // be sure we have an array to begin with
  actionCreators = Array.isArray( actionCreators ) ? actionCreators
    : [ actionCreators ]
  // always query the authentication
  actionCreators.unshift( users.auth )

  return class DataFetchersWrapper extends React.Component {

    // Don't pass the full store
    // • passing only dispatch will make server & client iso in what they get
    static fetchData( {dispatch, params = {}, query = {}, cookie } ) {
      return Promise.all(
        actionCreators.map( actionCreator => {
          return dispatch( actionCreator({params, cookie}) )
        })
      )
    }

    componentDidUpdate( prevProps ) {
      const { location } = this.props
      const { location: prevLocation } = prevProps

      const isUrlChanged = (location.pathname !== prevLocation.pathname)
                        || (location.search !== prevLocation.search)

      if (isUrlChanged) {
          this._fetchDataOnClient();
      }
    }

    componentDidMount() {
      if ( !IS_FIRST_MOUNT_AFTER_LOAD ) return this._fetchDataOnClient()
      IS_FIRST_MOUNT_AFTER_LOAD = false
    }

    _fetchDataOnClient() {
      const { params } = this.props.match
      DataFetchersWrapper.fetchData({
        dispatch: this.props.dispatch,
        params,
      })
    }

    render() {
      return (
        <Component {...this.props} />
      )
    }
  }
}
