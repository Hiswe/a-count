import React from 'react'

import * as user from './ducks/user'

// • coming from:
//   https://reactjsnews.com/isomorphic-react-in-real-life#data-fetching


// class ActivationsPageContainer extends React.Component {
//     render() {
//         return (
//             <ActivationsPage
//                 activations = {this.props.activations}
//                 search      = {this.props.search}
//                 onItemClick = {this.handleQuizCardClick}
//                 onSearch    = {this.handleSearch}
//             />
//         );
//     }
// }

// export default connect({activations : state.activations})(
//     connectDataFetchers(ActivationsPageContainer, [ loadActivations ])
// )


// route.component.fetchData(store, match.params, header.cookie)

// static fetchData(store, params, cookies) {
//   return store.dispatch( quotations.getAll(params, cookies) )
// }


let IS_FIRST_MOUNT_AFTER_LOAD = true

export default function connectDataFetchers({Component, actionCreators}) {
  // be sure we have an array to begin with
  actionCreators = Array.isArray( actionCreators ) ? actionCreators
    : [ actionCreators ]

  // always query the authentication
  actionCreators.unshift( user.auth )

  //
  return class DataFetchersWrapper extends React.Component {

    // Don't pass the full store
    // • passing only dispatch will make server & client iso in what they get
    static fetchData( {dispatch, params = {}, query = {}, cookie } ) {
      return Promise.all(
        actionCreators.map( actionCreator => {
          // return dispatch( actionCreator({ params, query, cookie }) )
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
