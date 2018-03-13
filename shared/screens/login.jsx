import React, { Component } from 'react'
import serialize from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../connect-data-fetcher.js'
import * as user from '../ducks/user'
import LayoutOnboard from '../components/ui/layout-onboard.jsx'
import FieldWrapper from '../components/ui/field-wrapper.jsx'

class Login extends Component {

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true } )
    this.props.login( {body} )
  }

  render() {
    const { props } = this

    return (
      <LayoutOnboard title="login">
        <form method="post" action="/login" onSubmit={ e => this.handleSubmit(e) } >
          <FieldWrapper id="email" label="Email">
            <input className="field__control" id="email" name="email" type="email" />
          </FieldWrapper>
          <FieldWrapper id="password" label="Password">
            <input className="field__control" id="password" name="password" type="password" />
          </FieldWrapper>
          <button className="btn" type="submit">Submit</button>
        </form>
      </LayoutOnboard>
    )
  }
}

const state2Props = state => {
  return {}
}

const dispatch2props = dispatch => {
  return bindActionCreators({
    login: user.login,
  }, dispatch)
}

export default connect( state2Props, dispatch2props )( ConnectDataFetcher({
  Component: Login,
  actionCreators: [
  ],
}) )
