import   React            from 'react'
import { Route          } from 'react-router-dom'
import { Helmet         } from 'react-helmet'

import   LayoutBoarding   from './layout/boarding'

const NotFound = () => (
  // we need a route to have access to serverContext
  <Route render={({ serverContext }) => {
    // serverContext is server only
    // put some infos here so the server can know things
    if ( serverContext ) {
      serverContext.status = 404
    }
    return (
      <LayoutBoarding title="404">
        <h2>not found</h2>
      </LayoutBoarding>
    )
  }}/>
)

export default NotFound
