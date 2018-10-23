import   React                                      from 'react'
import { NavLink           , withRouter }           from 'react-router-dom'
import { bindActionCreators }                       from 'redux'
import { connect            }                       from 'react-redux'
import { FormattedMessage  , FormattedHTMLMessage } from 'react-intl'

import * as account from '../redux-ducks/account'

import './main.scss'
const BASE_CLASS = `nav-main`
const ITEM_CLASS = `${BASE_CLASS}__item`
const ACTIVE_CLASS = `is-active`

class LogoutButton extends React.PureComponent {
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
        <FormattedMessage id="page.logout" />
      </a>
    )
  }
}

function ConnectedNav( props )  {
  return (
    <React.Fragment>
      <li className={ ITEM_CLASS }>
        <NavLink to="/" exact activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.home" />
        </NavLink>
      </li>
      <li className={ ITEM_CLASS }>
        <NavLink to="/quotations" activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.quotations" />
        </NavLink>
      </li>
      <li className={ ITEM_CLASS }>
        <NavLink to="/invoices" activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.invoices" />
        </NavLink>
      </li>
      <li className={ ITEM_CLASS }>
        <NavLink to="/customers" activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.customers" />
        </NavLink>
      </li>
      <li className={ ITEM_CLASS }>
        <NavLink to="/archives" activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.archived" />
        </NavLink>
      </li>
      <li className={ ITEM_CLASS }>
        <NavLink to="/account/settings" activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.settings" />
        </NavLink>
      </li>
      <li className={`${ITEM_CLASS} ${ITEM_CLASS}--separator`}>
        <FormattedHTMLMessage
          id="page.connected"
          values={{email: props.email}} />
      </li>
      <li className={ ITEM_CLASS }>
        <LogoutButton logout={ props.logout} />
      </li>
    </React.Fragment>
  )
}

function ConnectionNav( props ) {
  return (
    <React.Fragment>
      <li className="nav-main__item">
        <NavLink to="/account/login" activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.login" />
        </NavLink>
      </li>
      <li className="nav-main__item">
        <NavLink to="/account/register" activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.register" />
        </NavLink>
      </li>
      <li className="nav-main__item">
        <NavLink to="/account/forgot" activeClassName={ ACTIVE_CLASS }>
          <FormattedMessage id="page.forgot" />
        </NavLink>
      </li>
    </React.Fragment>
  )
}

function MainNav( props ) {
  const { isAuthenticated } = props
  return (
    <nav className={BASE_CLASS}>
      <ul className={`${BASE_CLASS}__in`}>
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
    isAuthenticated:  state.account.get( `isAuthenticated` ),
    email:            state.account.get( `user.email` ),
  }
}

function dispatch2props( dispatch ) {
  return bindActionCreators({
    logout: account.logout,
  }, dispatch)
}

// withRouter is needed for the <NavLink> to catch-up route changes
// • https://reacttraining.com/react-router/web/api/withRouter
export default withRouter( connect( state2props, dispatch2props )( MainNav ) )
