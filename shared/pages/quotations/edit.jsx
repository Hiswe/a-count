import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/nav/secondary.jsx'
import {
  ButtonNew,
  ButtonList,
  ButtonPrint,
  ButtonSubmit,
} from '../../components/nav/secondary-buttons.jsx'
import QuotationForm from '../../components/quotations/form.jsx'
import { FORM_ID } from '../../components/quotations/form.pres.jsx'
import ButtonCreateInvoice from '../../components/quotations/button-create-invoice.jsx'
import ButtonShowInvoice from '../../components/quotations/button-show-invoice.jsx'
import ButtonArchiveQuotation from '../../components/quotations/button-archive-quotation.jsx'

const TYPE = `quotations`

function EditQuotation( props ) {
  const { reference, ...others } = props
  const { id } = props.match.params

  return (
    <Fragment>
      <NavSecondary
        title={ <FormattedMessage id="page.quotations.edit" values={{reference}} /> }
      >
        <ButtonNew   type={ TYPE } secondary />
        <ButtonList  type={ TYPE } />
        <ButtonPrint type={ TYPE } id={ id } />
        <ButtonArchiveQuotation icon />
        <ButtonCreateInvoice />
        <ButtonShowInvoice />
        <ButtonSubmit
          formId   = { FORM_ID }
          isSaving = { props.isSaving }
        />
      </NavSecondary>
      <QuotationForm {...others} />
    </Fragment>
  )
}

function state2prop( state ) {
  return {
    reference: state.quotations.get( `current.reference` ),
    isSaving : state.quotations.get( `isSaving` ),
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: EditQuotation,
  actionCreators: [
    quotations.getOne,
    customers.getAll,
  ],
}) )
