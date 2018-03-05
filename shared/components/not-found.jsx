import React from 'react'
import { Route } from 'react-router-dom'

const NotFound = () => (
  // we need a route to have access to staticContext
  <Route render={({ staticContext }) => {
    // staticContext is server only
    // put some infos here so the server can know things
    if (staticContext) {
      staticContext.status = 404
    }
    return (
      <div>
        <h1>404</h1>
        <h2>not found</h2>
      </div>
    )
  }}/>
)

export default NotFound