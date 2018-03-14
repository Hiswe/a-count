import React from 'react'
import { Route } from 'react-router-dom'
import LayoutOnboard from '../components/layout/onboard.jsx'

const NotFound = () => (
  // we need a route to have access to staticContext
  <Route render={({ staticContext }) => {
    // staticContext is server only
    // put some infos here so the server can know things
    if ( staticContext ) {
      staticContext.status = 404
    }
    return (
      <LayoutOnboard title="404">
        <h2>not found</h2>
      </LayoutOnboard>
    )
  }}/>
)

export default NotFound
