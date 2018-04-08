import React, { PureComponent } from 'react'
import serialize from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import urlJoin from 'url-join'
import { injectIntl, FormattedMessage } from 'react-intl'

import config from '../../isomorphic-config.js'
import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as account from '../../ducks/account'
import LayoutBoarding from '../../components/layout/boarding.jsx'
import Form from '../../components/ui/form.jsx'
import { Button } from '../../components/ui/buttons.jsx'
import { Input } from '../../components/ui/field.jsx'

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
    const { intl } = props

    return (
      <LayoutBoarding title={intl.formatMessage({
        id: `account.forgot.title`,
        defaultMessage: `password forgotten`,
      })}>
        <Form id="forgot" action="/account/forgot" onSubmit={ this.handleSubmit } >
          <p>
            <FormattedMessage id="account.forgot.notice" defaultValue="after submitting the form you will receive a reset link by email" />
          </p>
          <input type="hidden" name="redirectUrl" value={ MAIL_REDIRECT_URL } />
          <Input
            name="email"
            label="field.email"
            type="email"
            defaultValue=""
          />
          <Button type="submit">
            <FormattedMessage id="account.forgot.button" defaultValue="Send reset link" />
          </Button>
        </Form>
      </LayoutBoarding>
    )
  }
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
    forgot: account.forgot,
  }, dispatch)
}

export default connect( null, dispatch2prop )( ConnectDataFetcher({
  Component: injectIntl( Forgot ),
  actionCreators: [
  ],
}) )
