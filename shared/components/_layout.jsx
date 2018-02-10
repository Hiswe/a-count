import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

const Layout = ({ route }) => {
  return (
    <div id="react-wrapper">
      <header className="main-header">
        <ul>
          <li><NavLink to="/" activeClassName="is-active">home</NavLink></li>
          {/* <li><NavLink to="/quotations">quotations</NavLink></li>
          <li><NavLink to="/invoices">invoices</NavLink></li> */}
          <li><NavLink to="/customers" activeClassName="is-active">customers</NavLink></li>
          {/* <li><NavLink to="/settings">settings</NavLink></li> */}
        </ul>
      </header>
      <main role="main">
        {/* child routes won't render without this */}
        {/* https://www.npmjs.com/package/react-router-config#renderroutesroutes-extraprops-- */}
        { renderRoutes(route.routes) }
      </main>
    </div>
  )
}

export { Layout as default }
