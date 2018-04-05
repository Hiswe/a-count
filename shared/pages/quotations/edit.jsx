import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

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
import { Button } from '../../components/ui/buttons.jsx'
import QuotationForm from '../../components/quotations/form.jsx'
import { FORM_ID } from '../../components/quotations/form.pres.jsx'
import {
  ButtonCreateInvoice,
} from '../../components/quotations/secondary-nav-actions.jsx'

const TYPE = `quotations`

function EditQuotation( props ) {
  const { reference, intl, canBeTransformedToInvoice } = props
  const { id } = props.match.params

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage(
        {id: `page.quotations.edit`},
        {reference: props.reference}
      )}>
        <ButtonNew   type={ TYPE } secondary />
        <ButtonList  type={ TYPE } />
        <ButtonPrint type={ TYPE } id={ id } />
        <ButtonCreateInvoice />
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
  Component: injectIntl( EditQuotation ),
  actionCreators: [
    quotations.getOne,
    customers.getAll,
  ],
}) )
