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
  ButtonNewQuotation,
} from '../../components/nav/secondary-buttons.jsx'
import QuotationForm from '../../components/quotations/form.jsx'
import {
  ButtonSubmit,
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
        <ButtonNew   type={ TYPE } />
        <ButtonList  type={ TYPE } />
        <ButtonPrint type={ TYPE } id={ id } />
        <ButtonCreateInvoice />
        <ButtonSubmit isSaving={ props.isSaving } />
      </NavSecondary>
      <QuotationForm {...props} />
    </Fragment>
  )
}

function state2prop( state ) {
  const { current, isSaving } = state.quotations
  const result = {
    reference:                  current.get( `reference` ),
    isSaving,
  }
  return result
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: injectIntl( EditQuotation ),
  actionCreators: [
    quotations.getOne,
    customers.getAll,
  ],
}) )
