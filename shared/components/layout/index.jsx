import React from 'react'
import { renderRoutes } from 'react-router-config'

import MainNav from './main-nav.jsx'

const Layout = ({ route }) => {
  return (
    <div id="react-wrapper">
      <MainNav />
      <main role="main">
        {/* child routes won't render without this */}
        {/* https://www.npmjs.com/package/react-router-config#renderroutesroutes-extraprops-- */}
        { renderRoutes(route.routes) }
      </main>
    </div>
  )
}

export { Layout as default }
