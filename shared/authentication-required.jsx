import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// Protect the route if NOT authenticate
// • based on https://crysislinux.com/limit-access-to-redux-apps-with-higher-order-components/
export function authenticationRequired( Component ) {

  const AuthenticatedComponent = props => {
    const { staticContext } = props

    if ( props.isAuthenticated ) return <Component {...props}/>

    const redirectUrl = `/login`
    if ( staticContext ) {
      staticContext.status = 302
      staticContext.url = redirectUrl
    }
    return <Redirect to={redirectUrl} />
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  })

  return connect( mapStateToProps )( AuthenticatedComponent )
}

export default authenticationRequired
