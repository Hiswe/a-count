import React, { Fragment, PureComponent } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as users from '../../ducks/users'

import './nav-main.scss'

class LogoutButton extends PureComponent {
  constructor( props ) {
    super( props )
    this.logout = this.logout.bind( this )
  }
  logout( e ) {
    e.preventDefault()
    this.props.logout( {} )
  }
  render() {
    return (
      <a href="/account/logout" onClick={ this.logout }>logout</a>
    )
  }
}

function ConnectedNav( props )  {
  return (
    <Fragment>
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
      <li className="nav-main__item nav-main__item--separator">
        connected as<br /> {props.email}
      </li>
      <li className="nav-main__item">
        <LogoutButton logout={ props.logout} />
      </li>
    </Fragment>
  )
}

function ConnectionNav( props ) {
  return (
    <Fragment>
      <li className="nav-main__item">
        <NavLink to="/account/login" activeClassName="is-active">login</NavLink>
      </li>
      <li className="nav-main__item">
        <NavLink to="/account/register" activeClassName="is-active">register</NavLink>
      </li>
      <li className="nav-main__item">
        <NavLink to="/account/forgot" activeClassName="is-active">forgot</NavLink>
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
          : <ConnectionNav {...props} />
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

function dispatch2props( dispatch ) {
  return bindActionCreators({
    logout: users.logout,
  }, dispatch)
}

// withRouter is needed for the <NavLink> to catch-up route changes
// • https://reacttraining.com/react-router/web/api/withRouter
export default withRouter( connect( state2props, dispatch2props )( MainNav ) )
