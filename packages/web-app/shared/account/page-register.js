import   urlJoin              from 'url-join'
import   React                from 'react'
import   serialize            from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'
import { FormattedMessage   } from 'react-intl'
import { Helmet             } from 'react-helmet'

import      config               from '../isomorphic-config'
import      routeFetchActions    from '../route-fetch-actions'
import * as account              from '../redux-ducks/account'
import      LayoutBoarding       from '../layout/boarding'
import      Form                 from '../ui/form'
import {    Button             } from '../ui/buttons'
import {    Input              } from '../ui/field'

const MAIL_REDIRECT_URL = urlJoin( config.HOST_URL, `/account/set-password` )

class Register extends React.PureComponent {

  constructor( props ) {
    super( props )
    this.handleSubmit = this.handleSubmit.bind( this )
  }

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true } )
    this.props.register({ body })
  }

  render() {
    const { props } = this
    const titleProps  = { id:`account.register.title` }

    return (
      <React.Fragment>
        <FormattedMessage {...titleProps} >
          {title => <Helmet><title>{title}</title></Helmet>}
        </FormattedMessage>
        <LayoutBoarding
          title={ <FormattedMessage {...titleProps} /> }
        >
          <Form action="/account/register" onSubmit={ this.handleSubmit } >
            <p>
              <FormattedMessage id="account.register.notice" />
            </p>
            <input type="hidden" name="redirectUrl" value={ MAIL_REDIRECT_URL } />
            <Input
              name="email"
              label="field.email"
              type="email"
              defaultValue=""
            />
            <Button type="submit">
              <FormattedMessage id="account.register.button" defaultValue="Create" />
            </Button>
          </Form>
        </LayoutBoarding>
      </React.Fragment>
    )
  }
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
    register: account.register,
  }, dispatch)
}

export default connect(null, dispatch2prop)( routeFetchActions({
  Component: Register,
  actionCreators: [
  ],
}) )
