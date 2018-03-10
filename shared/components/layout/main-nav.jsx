import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const ConnectedNav = props => {
  return (
    <Fragment>
      <li className="main-nav__item">
        <NavLink to="/" exact activeClassName="is-active">home</NavLink>
      </li>
      <li className="main-nav__item">
        <NavLink to="/quotations" activeClassName="is-active">quotations</NavLink>
      </li>
      {/* <li><NavLink to="/invoices">invoices</NavLink></li> */}
      <li className="main-nav__item">
        <NavLink to="/customers" activeClassName="is-active">customers</NavLink>
      </li>
      {/* <li><NavLink to="/settings">settings</NavLink></li> */}
      <li className="main-nav__item main-nav__item--separator">
        <a href="/logout">logout</a>
      </li>
    </Fragment>
  )
}

const ConnectionNav = props => {
  return (
    <Fragment>
      <li className="main-nav__item main-nav__item--separator">
        <NavLink to="/login" activeClassName="is-active">login</NavLink>
      </li>
      <li className="main-nav__item">
        <NavLink to="/register" activeClassName="is-active">register</NavLink>
      </li>
    </Fragment>
  )
}

const MainNav = props => {
  const { isAuthenticated } = props
  return (
    <nav className="main-nav">
      <ul className="main-nav__in">
        <li className="main-nav__item">
          <h1 className="main-nav__logo">Concompte</h1>
        </li>
        {
          isAuthenticated ? <ConnectedNav />
          : <ConnectionNav />
        }
      </ul>
    </nav>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect( mapStateToProps )( MainNav )
