import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

const Layout = ({ route }) => {
  return (
    <div id="react-wrapper">
      <header className="header">
        <ul className="header__in">
          <li className="header__item"><NavLink to="/">home</NavLink></li>
          <li className="header__item"><NavLink to="/quotations" activeClassName="is-active">quotations</NavLink></li>
          {/*
          <li><NavLink to="/invoices">invoices</NavLink></li>
          */}
          <li className="header__item"><NavLink to="/customers" activeClassName="is-active">customers</NavLink></li>
          {/* <li><NavLink to="/settings">settings</NavLink></li> */}
          <li className="header__item header__item--separator"><NavLink to="/login" activeClassName="is-active">login</NavLink></li>
          <li><NavLink className="header__item" to="/register" activeClassName="is-active">register</NavLink></li>
          <li><a className="header__item" href="/logout">logout</a></li>
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
