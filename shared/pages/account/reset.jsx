import React, { PureComponent } from 'react'
import serialize from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { injectIntl, FormattedMessage } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as users from '../../ducks/users'
import LayoutBoarding from '../../components/layout/boarding.jsx'
import Form from '../../components/ui/form.jsx'
import { Button } from '../../components/ui/buttons.jsx'
import { Input } from '../../components/ui/field.jsx'

class Reset extends PureComponent {

  constructor( props ) {
    super( props )

    this.handleSubmit = this.handleSubmit.bind( this )
    this.state = {
      token: queryString.parse( props.location.search ).token
    }
  }

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true } )
    this.props.reset( { params: { body }} )
  }

  render() {
    const { props, state } = this
    const { intl } = props

    return (
      <LayoutBoarding title={intl.formatMessage({
        id: `account.reset.title`,
        defaultMessage: `Reset`,
      })}>
        <Form id="login" action="/account/reset" onSubmit={ this.handleSubmit } >
          <p>
            <FormattedMessage id="account.reset.notice" defaultValue="Set your new password here" />
          </p>
          <input type="hidden" name="token" defaultValue={state.token} />
          <Input
            name="password"
            type="password"
            label={intl.formatMessage({
              id: `field.password`,
              defaultMessage: `password`,
            })}
            defaultValue=""
          />
          <Button type="submit">
            <FormattedMessage id="account.reset.button" defaultValue="reset password" />
          </Button>
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
    reset: users.reset,
  }, dispatch)
}

export default connect( null, dispatch2prop )( ConnectDataFetcher({
  Component: injectIntl( Reset ),
  actionCreators: [
  ],
}) )
