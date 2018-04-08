import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/nav/secondary.jsx'
import { ButtonSubmit } from '../../components/nav/secondary-buttons.jsx'
import SettingForm from '../../components/account/settings.jsx'
import { FORM_ID } from '../../components/account/settings.pres.jsx'

function EditProfile( props ) {
  return (
    <Fragment>
      <NavSecondary
        title={ <FormattedMessage id="page.settings" /> }
      >
        <ButtonSubmit formId={ FORM_ID } isSaving={ props.isSaving } />
      </NavSecondary>
      <SettingForm {...props} />
    </Fragment>
  )
}

function state2prop( state ) {
  return {
    isSaving: state.account.get( `isSaving` ),
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: EditProfile,
  actionCreators: [
  ],
}) )


