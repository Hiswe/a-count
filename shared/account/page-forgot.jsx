import   React                from 'react'
import   serialize            from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'
import   urlJoin              from 'url-join'
import { FormattedMessage   } from 'react-intl'
import { Helmet             } from 'react-helmet'

import      config               from '../isomorphic-config.js'
import      ConnectDataFetcher   from '../connect-data-fetcher.js'
import * as account              from '../ducks/account'
import      LayoutBoarding       from '../layout/boarding.jsx'
import      Form                 from '../ui/form.jsx'
import {    Button             } from '../ui/buttons.jsx'
import {    Input              } from '../ui/field.jsx'

const MAIL_REDIRECT_URL = urlJoin( config.HOST_URL, '/account/reset' )

class Forgot extends React.PureComponent {

  constructor( props ) {
    super( props )
    this.handleSubmit = this.handleSubmit.bind( this )
  }

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true } )
    this.props.forgot({ body })
  }

  render() {
    const { props } = this
    const titleProps  = { id:`account.forgot.title` }

    return (
      <React.Fragment>
        <FormattedMessage {...titleProps} >
          {title => <Helmet><title>{title}</title></Helmet>}
        </FormattedMessage>
        <LayoutBoarding
          title={ <FormattedMessage {...titleProps} /> }
        >
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
      </React.Fragment>
    )
  }
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
    forgot: account.forgot,
  }, dispatch)
}

export default connect( null, dispatch2prop )( ConnectDataFetcher({
  Component: Forgot,
  actionCreators: [
  ],
}) )
