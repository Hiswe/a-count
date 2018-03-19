import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// Protect the route if AUTHENTICATE
// • the opposite of authentication-required ;)
// • based on https://crysislinux.com/limit-access-to-redux-apps-with-higher-order-components/

const PRIVATE_ROOT = `/`

export function authenticationForbidden( Component ) {

  function AuthForbidden( props ) {
    const { staticContext } = props

    if ( !props.isAuthenticated ) return <Component {...props}/>

    if ( staticContext ) {
      staticContext.status = 302
      staticContext.url = PRIVATE_ROOT
    }
    return <Redirect to={ PRIVATE_ROOT } />
  }

  // Hoist “Component.fetchData”
  // • needed by the the server to fetch the right data
  if ( Component.fetchData ) {
    AuthForbidden.fetchData = Component.fetchData
  }

  function state2prop( state ) {
    // pass global states
    return {
      isAuthenticated:  state.users.isAuthenticated,
      isFetching:       state.loading.isFetching,
      isPosting:        state.loading.isPosting,
    }
  }

  return connect( state2prop )( AuthForbidden )

}

export default authenticationForbidden
