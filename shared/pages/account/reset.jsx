import React, { PureComponent } from 'react'
import serialize from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as users from '../../ducks/users'
import LayoutBoarding from '../../components/layout/boarding.jsx'
import Form from '../../components/ui/form.jsx'
import { Button } from '../../components/ui/buttons.jsx'
import Field from '../../components/ui/field.jsx'

class Reset extends PureComponent {

  constructor( props ) {
    super( props )
    this.handleSubmit = this.handleSubmit.bind( this )
  }

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true } )
    // this.props.dispatch( users.login({
    //   params: { body },
    // }) )
  }

  render() {
    const { props } = this

    return (
      <LayoutBoarding title="Reset – set your password here">
        <Form id="login" action="/account/reset" onSubmit={ this.handleSubmit } >
          <Field
            name="password"
            type="password"
            defaultValue=""
          />
          <Button type="submit">Connect</Button>
        </Form>
      </LayoutBoarding>
    )
  }
}

export default connect()( ConnectDataFetcher({
  Component: Reset,
  actionCreators: [
  ],
}) )