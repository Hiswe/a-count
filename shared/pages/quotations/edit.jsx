import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/layout/nav-secondary.jsx'
import QuotationForm, { BASE_CLASS } from '../../components/quotations/form.jsx'
import { ButtonList, ButtonNew, ButtonSubmit } from '../../components/quotations/secondary-nav-actions.jsx'

// TODO: should have a print button

function EditQuotation( props ) {
  const { reference, intl } = props
  const title = `Edit Quotation – ${ reference }`

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage(
        {id: `page.quotations.edit`},
        {reference: props.reference}
      )}>
        <ButtonNew />
        <ButtonList />
        <ButtonSubmit isSaving={ props.isSaving } />
      </NavSecondary>
      <QuotationForm {...props} />
    </Fragment>
  )
}

function state2prop( state ) {
  const { current } = state.quotations
  const result = {
    reference:  current.reference,
    isSaving:   current.isSaving === true
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
