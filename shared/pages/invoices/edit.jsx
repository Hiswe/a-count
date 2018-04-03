import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as invoices from '../../ducks/invoices'
import NavSecondary from '../../components/nav/secondary.jsx'
import { ButtonList } from '../../components/invoices/secondary-nav-actions.jsx'
import InvoiceForm from '../../components/invoices/form.jsx'

function EditInvoice( props ) {
  const { reference, intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage(
        {id: `page.invoices.edit`},
        {reference: props.reference}
      )}>
        <ButtonList />
      </NavSecondary>
      <InvoiceForm />
    </Fragment>
  )
}

function state2prop( state ) {
  const { current, isSaving } = state.invoices
  return {
    reference: current.reference,
    isSaving,
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: injectIntl( EditInvoice ),
  actionCreators: [
    invoices.getOne,
  ],
}) )
