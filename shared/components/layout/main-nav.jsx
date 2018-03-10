import React, { Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import LogoutButton from './logout-button.jsx'

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
        <LogoutButton />
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
// withRouter is needed for the nav to catch-up
// • https://reacttraining.com/react-router/web/api/withRouter
export default withRouter( connect( mapStateToProps )( MainNav ) )
