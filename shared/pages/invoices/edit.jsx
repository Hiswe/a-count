import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as invoices from '../../ducks/invoices'
import NavSecondary from '../../components/nav/secondary.jsx'
import {
  ButtonList,
  ButtonPrint,
  ButtonSubmit,
} from '../../components/nav/secondary-buttons.jsx'
import InvoiceForm, { FORM_ID } from '../../components/invoices/form.jsx'
import ButtonShowQuotation from '../../components/invoices/button-show-quotation.jsx'

const TYPE = `invoices`

function EditInvoice( props ) {
  const { reference } = props
  const { id } = props.match.params

  return (
    <Fragment>
      <NavSecondary
        title={ <FormattedMessage id="page.invoices.edit" values={{reference}} /> }
      >
        <ButtonList type={ TYPE } />
        <ButtonPrint type={ TYPE } id={ id } />
        <ButtonShowQuotation />
        <ButtonSubmit formId={ FORM_ID } isSaving={ props.isSaving } />
      </NavSecondary>
      <InvoiceForm />
    </Fragment>
  )
}

function state2prop( state ) {
  return {
    reference:  state.invoices.get( `current.reference` ),
    isSaving:   state.invoices.get( `isSaving` ),
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: EditInvoice,
  actionCreators: [
    invoices.getOne,
  ],
}) )
