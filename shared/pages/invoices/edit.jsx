import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as invoices from '../../ducks/invoices'
import NavSecondary from '../../components/nav/secondary.jsx'

function EditInvoice( props ) {
  const { reference, intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage(
        {id: `page.invoices.edit`},
        {reference: props.reference}
      )}>
      </NavSecondary>
    </Fragment>
  )
}

function state2prop( state ) {
  return {}
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: injectIntl( EditInvoice ),
  actionCreators: [
  ],
}) )
