import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/nav/secondary.jsx'
import { ButtonSubmit } from '../../components/nav/secondary-buttons.jsx'
import SettingForm, { FORM_ID } from '../../components/account/settings.jsx'

function EditProfile( props ) {
  const titleProps  = { id:`page.settings` }

  return (
    <Fragment>
      <FormattedMessage {...titleProps} >
        {title => <Helmet><title>{title}</title></Helmet>}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonSubmit
          formId={ FORM_ID }
          isSaving={ props.isSaving }
          label="configuration.button.save"
        />
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


