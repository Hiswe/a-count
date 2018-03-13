import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as users from '../../ducks/users'

class LogoutButton extends Component {

  logout( e ) {
    e.preventDefault()
    this.props.dispatch( users.logout( {} ) )
  }

  render() {
    return (
      <a href="/logout" onClick={ e => this.logout(e) }>logout</a>
    )
  }
}

const state2props = state => {
  return {
    isAuthenticated: state.users.isAuthenticated,
  }
}

export default connect( state2props )( LogoutButton )
