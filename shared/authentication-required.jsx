import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// Protect the route if NOT authenticate
// • based on https://crysislinux.com/limit-access-to-redux-apps-with-higher-order-components/

const PUBLIC_ROOT = `/login`

export function authenticationRequired( Component ) {

  const AuthenticatedComponent = props => {
    const { staticContext } = props

    if ( props.isAuthenticated ) return <Component {...props}/>

    if ( staticContext ) {
      staticContext.status = 302
      staticContext.url = PUBLIC_ROOT
    }
    return <Redirect to={ PUBLIC_ROOT } />
  }

  // Hoist “Component.fetchData”
  // • needed by the the server to fetch the right data
  if ( Component.fetchData ) {
    AuthenticatedComponent.fetchData = Component.fetchData
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.users.isAuthenticated,
  })

  return connect( mapStateToProps )( AuthenticatedComponent )
}

export default authenticationRequired
