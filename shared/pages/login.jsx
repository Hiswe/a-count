import React, { Component } from 'react'
import serialize from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../connect-data-fetcher.js'
import * as users from '../ducks/users'
import LayoutOnboard from '../components/layout/onboard.jsx'
import Field from '../components/ui/field.jsx'

class Login extends Component {

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true } )
    this.props.dispatch( users.login({
      params: { body },
    }) )
  }

  render() {
    const { props } = this

    return (
      <LayoutOnboard title="login">
        <form method="post" action="/login" onSubmit={ e => this.handleSubmit(e) } >
          <Field
            name="email"
            type="email"
          />
          <Field
            name="password"
            type="password"
          />
          <button className="btn" type="submit">Submit</button>
        </form>
      </LayoutOnboard>
    )
  }
}

export default connect()( ConnectDataFetcher({
  Component: Login,
  actionCreators: [
  ],
}) )
