import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as invoices from '../../ducks/invoices'
import NavSecondary from '../../components/nav/secondary.jsx'
import {
  ButtonList,
  ButtonPreview,
  ButtonSubmit,
} from '../../components/nav/secondary-buttons.jsx'
import InvoiceForm, { FORM_ID } from '../../components/invoices/form.jsx'
import ButtonShowQuotation from '../../components/invoices/button-show-quotation.jsx'

const TYPE = `invoices`

function EditInvoice( props ) {
  const { reference } = props
  const { id } = props.match.params
  const titleProps  = { id:`page.invoices.edit`, values: {reference} }

  return (
    <Fragment>
      <FormattedMessage {...titleProps} >
        {title => <Helmet><title>{title}</title></Helmet>}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonSubmit formId={ FORM_ID } isSaving={ props.isSaving } />
        <ButtonShowQuotation />
        <ButtonPreview type={ TYPE } id={ id } />
        <ButtonList    type={ TYPE }           />
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
