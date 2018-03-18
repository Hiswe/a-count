import React, { Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import './nav-main.scss'

import LogoutButton from './logout-button.jsx'

function ConnectedNav( props )  {
  return (
    <Fragment>
      <li className="nav-main__item">
        connected as<br /> {props.email}
      </li>
      <li className="nav-main__item">
        <NavLink to="/" exact activeClassName="is-active">home</NavLink>
      </li>
      <li className="nav-main__item">
        <NavLink to="/quotations" activeClassName="is-active">quotations</NavLink>
      </li>
      {/* <li><NavLink to="/invoices">invoices</NavLink></li> */}
      <li className="nav-main__item">
        <NavLink to="/customers" activeClassName="is-active">customers</NavLink>
      </li>
      <li className="nav-main__item">
        <NavLink to="/profile" activeClassName="is-active">profile</NavLink>
      </li>
      <li className="nav-main__item  nav-main__item--separator">
        <LogoutButton />
      </li>
    </Fragment>
  )
}

function ConnectionNav( props ) {
  return (
    <Fragment>
      <li className="nav-main__item">
        <NavLink to="/login" activeClassName="is-active">login</NavLink>
      </li>
      <li className="nav-main__item">
        <NavLink to="/register" activeClassName="is-active">register</NavLink>
      </li>
    </Fragment>
  )
}

function MainNav( props ) {
  const { isAuthenticated } = props
  return (
    <nav className="nav-main">
      <ul className="nav-main__in">
        {
          isAuthenticated ? <ConnectedNav {...props} />
          : <ConnectionNav />
        }
      </ul>
    </nav>
  )
}


function state2props( state ) {
  return {
    isAuthenticated: state.users.isAuthenticated,
    email: state.users.current.email,
  }
}

// withRouter is needed for the <NavLink> to catch-up route changes
// • https://reacttraining.com/react-router/web/api/withRouter
export default withRouter( connect( state2props )( MainNav ) )
