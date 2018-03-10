import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// Protect the route if AUTHENTICATE
// • the opposite of authentication-required ;)
// • based on https://crysislinux.com/limit-access-to-redux-apps-with-higher-order-components/
export function authenticationForbidden( Component ) {

  const AuthenticatedComponent = props => {
    const { staticContext } = props

    if ( !props.isAuthenticated ) return <Component {...props}/>

    const redirectUrl = `/`
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

export default authenticationForbidden
