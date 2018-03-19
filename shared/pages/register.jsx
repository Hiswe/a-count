import React, { Component } from 'react'
import serialize from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../connect-data-fetcher.js'
import * as users from '../ducks/users'
import LayoutOnboard from '../components/layout/onboard.jsx'
import Field from '../components/ui/field.jsx'

class Register extends Component {

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true } )
    this.props.dispatch( users.register({
      params: { body },
    }) )
  }

  render() {
    const { props } = this

    return (
      <LayoutOnboard title="Create an account">
        <form method="post" action="/register" onSubmit={ e => this.handleSubmit(e) } >
          <Field
            name="email"
            type="email"
            defaultValue=""
          />
          <Field
            name="password"
            type="password"
            defaultValue=""
          />
          <button className="btn" type="submit">Submit</button>
        </form>
      </LayoutOnboard>
    )
  }
}

export default connect()( ConnectDataFetcher({
  Component: Register,
  actionCreators: [
  ],
}) )
