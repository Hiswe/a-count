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
  const { quotation, ...others } = props
  const { id } = props.match.params
  const reference = quotation.get(`reference`)

  return (
    <Fragment>
      <NavSecondary
        title={ <FormattedMessage id="page.quotations.edit" values={{reference}} /> }
      >
        <ButtonSubmit
          formId   = { FORM_ID }
          isSaving = { props.isSaving }
        />
        <ButtonShowInvoice
          withMessage
          quotation={ quotation }
        />
        <ButtonArchiveQuotation icon
          quotation={ quotation }
          form={ FORM_ID }
        />
        <ButtonCreateInvoice
          quotation={ quotation }
          form={ FORM_ID }
        />
        <ButtonPrint type={ TYPE } id={ id } />
        <ButtonList  type={ TYPE } />
        <ButtonNew   type={ TYPE } secondary icon />
      </NavSecondary>
      <QuotationForm {...others} />
    </Fragment>
  )
}

function state2prop( state ) {
  return {
    quotation: state.quotations.get( `current` ),
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
