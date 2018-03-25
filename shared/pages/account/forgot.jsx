import React, { PureComponent } from 'react'
import serialize from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import urlJoin from 'url-join'

import config from '../../config.js'
import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as users from '../../ducks/users'
import LayoutBoarding from '../../components/layout/boarding.jsx'
import Form from '../../components/ui/form.jsx'
import { Button } from '../../components/ui/buttons.jsx'
import Field from '../../components/ui/field.jsx'

const MAIL_REDIRECT_URL = urlJoin( config.HOST_URL, '/account/reset' )

class Forgot extends PureComponent {

  constructor( props ) {
    super( props )
    this.handleSubmit = this.handleSubmit.bind( this )
  }

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true } )
    this.props.forgot( { params: { body }} )
  }

  render() {
    const { props } = this

    return (
      <LayoutBoarding title="Forgot">
        <Form id="forgot" action="/account/forgot" onSubmit={ this.handleSubmit } >
          <p>after submitting the form you will receive a reset link by email</p>
          <input type="hidden" name="redirectUrl" value={ MAIL_REDIRECT_URL } />
          <Field
            name="email"
            type="email"
            defaultValue=""
          />
          <Button type="submit">Send reset link</Button>
        </Form>
      </LayoutBoarding>
    )
  }
}

function state2prop( state ) {
  return {}
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
    forgot: users.forgot,
  }, dispatch)
}

export default connect( null, dispatch2prop )( ConnectDataFetcher({
  Component: Forgot,
  actionCreators: [
  ],
}) )
