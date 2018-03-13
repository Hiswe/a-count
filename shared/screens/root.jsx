import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import MainNav from '../components/layout/main-nav.jsx'
import Notifications from '../components/layout/notifications.jsx'
import ErrorBoundary from '../components/error-boundary.jsx'

const Layout = props => {
  const { route } = props
  return (
    <div id="react-wrapper">
      <h1 className="main-logo">Concompte</h1>
      <MainNav />
      <ErrorBoundary>
        {/* child routes won't render without this */}
        {/* https:www.npmjs.com/package/react-router-config#renderroutesroutes-extraprops-- */}
        { renderRoutes(route.routes) }
      </ErrorBoundary>
      <Notifications />
    </div>
  )
}

export default Layout

