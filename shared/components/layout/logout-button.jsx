import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as auth from '../../ducks/auth'

class LogoutButton extends Component {

  logout(e) {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    return (
      <a href="/logout" onClick={ e => this.logout(e) }>logout</a>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    logout: auth.logout,
  }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )( LogoutButton )
