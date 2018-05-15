import   urlJoin              from 'url-join'
import   React                from 'react'
import   serialize            from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'
import { FormattedMessage   } from 'react-intl'
import { Helmet             } from 'react-helmet'

import      config               from '../isomorphic-config'
import      pageFetchActions     from '../page-fetch-actions'
import * as account              from '../redux-ducks/account'
import      LayoutBoarding       from '../layout/boarding'
import      Form                 from '../ui/form'
import {    Button             } from '../ui/buttons'
import {    Input              } from '../ui/field'

const MAIL_REDIRECT_URL = urlJoin( config.HOST_URL, `/account/reset` )

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
              <FormattedMessage id="account.forgot.notice"/>
            </p>
            <input type="hidden" name="redirectUrl" value={ MAIL_REDIRECT_URL } />
            <Input
              name="email"
              label="field.email"
              type="email"
              defaultValue=""
            />
            <Button type="submit">
              <FormattedMessage id="account.forgot.button" />
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

export default connect( null, dispatch2prop )( pageFetchActions({
  Component: Forgot,
  actionCreators: [
  ],
}) )
