import React, { Fragment, PureComponent } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'

import * as users from '../../ducks/users'

import './nav-main.scss'
const BASE_CLASS = `nav-main`
const ITEM_CLASS = `${BASE_CLASS}__item`
const ACTIVE_CLASS = `is-active`

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
      <a href="/account/logout" onClick={ this.logout }>
        <FormattedMessage id="page.logout" defaultMessage="logout" />
      </a>
    )
  }
}

function ConnectedNav( props )  {
  return (
    <Fragment>
      <li className={ ITEM_CLASS }>
        <NavLink to="/" exact activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.home" defaultMessage="home" />
        </NavLink>
      </li>
      <li className={ ITEM_CLASS }>
        <NavLink to="/quotations" activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.quotations" defaultMessage="quotations" />
        </NavLink>
      </li>
      {/*
      <li className={ ITEM_CLASS }>
        <NavLink to="/invoices" activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.invoices" defaultMessage="invoices" />
        </NavLink>
      </li>
      */}
      <li className={ ITEM_CLASS }>
        <NavLink to="/customers" activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.customers" defaultMessage="customers" />
        </NavLink>
      </li>
      <li className={ ITEM_CLASS }>
        <NavLink to="/profile" activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.settings" defaultMessage="settings" />
        </NavLink>
      </li>
      <li className={`${ITEM_CLASS} ${ITEM_CLASS}--separator`}>
        <FormattedHTMLMessage
          id="page.connected"
          defaultMessage="connected as <br/> {email}"
          values={{email: props.email}} />
      </li>
      <li className={ ITEM_CLASS }>
        <LogoutButton logout={ props.logout} />
      </li>
    </Fragment>
  )
}

function ConnectionNav( props ) {
  return (
    <Fragment>
      <li className="nav-main__item">
        <NavLink to="/account/login" activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.login" defaultMessage="login" />
        </NavLink>
      </li>
      <li className="nav-main__item">
        <NavLink to="/account/register" activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.register" defaultMessage="register" />
        </NavLink>
      </li>
      <li className="nav-main__item">
        <NavLink to="/account/forgot" activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.forgot" defaultMessage="forgot" />
        </NavLink>
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
