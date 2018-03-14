import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'

import MainNav from './main-nav.jsx'
import ErrorBoundary from '../error-boundary.jsx'
import Notifications from '../ui/notifications.jsx'

import './root.scss'

const Layout = props => {
  const { route } = props
  return (
    <div id="react-wrapper">
      <h1 className="main-logo">Concompte</h1>
      <MainNav />
      <ErrorBoundary>
        {/* child routes won't render without this */}
        {/* https://www.npmjs.com/package/react-router-config#renderroutesroutes-extraprops-- */}
        { renderRoutes(route.routes) }
      </ErrorBoundary>
      <Notifications />
    </div>
  )
}

export default Layout

