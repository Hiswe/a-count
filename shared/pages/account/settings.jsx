import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/nav/secondary.jsx'
import UserForm from '../../components/users/form.jsx'
import { ButtonSubmit } from '../../components/users/secondary-nav-actions.jsx'

function EditProfile( props ) {
  const { intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage({
        id: `page.settings`,
        defaultMessage: `settings`,
      })}>
        <ButtonSubmit isSaving={ props.isSaving } />
      </NavSecondary>
      <UserForm {...props} />
    </Fragment>
  )
}

function state2prop( state ) {
  return {
    isSaving: state.users.isSaving
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: injectIntl( EditProfile ),
  actionCreators: [
  ],
}) )
