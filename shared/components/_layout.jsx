import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

const Layout = ({ route }) => {
  return (
    <div id="react-wrapper">
      <nav className="main-nav">
        <ul className="main-nav__in">
          <li className="main-nav__item"><h1 className="main-nav__logo">Concompte</h1></li>
          <li className="main-nav__item"><NavLink to="/">home</NavLink></li>
          <li className="main-nav__item"><NavLink to="/quotations" activeClassName="is-active">quotations</NavLink></li>
          {/*
          <li><NavLink to="/invoices">invoices</NavLink></li>
          */}
          <li className="main-nav__item"><NavLink to="/customers" activeClassName="is-active">customers</NavLink></li>
          {/* <li><NavLink to="/settings">settings</NavLink></li> */}
          <li className="main-nav__item main-nav__item--separator"><NavLink to="/login" activeClassName="is-active">login</NavLink></li>
          <li className="main-nav__item"><NavLink  to="/register" activeClassName="is-active">register</NavLink></li>
          <li className="main-nav__item"><a href="/logout">logout</a></li>
        </ul>
      </nav>
      <main role="main">
        {/* child routes won't render without this */}
        {/* https://www.npmjs.com/package/react-router-config#renderroutesroutes-extraprops-- */}
        { renderRoutes(route.routes) }
      </main>
    </div>
  )
}

export { Layout as default }
