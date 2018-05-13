import   React                from 'react'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'
import { FormattedMessage   } from 'react-intl'
import { Helmet             } from 'react-helmet'

import      ConnectDataFetcher              from '../connect-data-fetcher'
import * as customers                       from '../redux-ducks/customers'
import      NavSecondary                    from '../nav/secondary'
import {    ButtonSubmit       }            from '../nav/secondary-buttons'
import      SettingForm       , { FORM_ID } from './settings'

function EditProfile( props ) {
  const titleProps  = { id:`page.settings` }

  return (
    <React.Fragment>
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
    </React.Fragment>
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


