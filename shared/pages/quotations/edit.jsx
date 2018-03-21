import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/layout/nav-secondary.jsx'
import QuotationForm from '../../components/quotations/form.jsx'
import { ButtonList, ButtonNew } from '../../components/quotations/secondary-nav-actions.jsx'

// TODO: should have a print button

function EditQuotation( props ) {
  const { reference } = props
  const title = `Edit Quotation – ${ reference }`

  return (
    <Fragment>
      <NavSecondary title={ title }>
        <ButtonNew />
        <ButtonList />
      </NavSecondary>
      <QuotationForm {...props} />
    </Fragment>
  )
}

function state2prop( state ) {
  const { current } = state.quotations
  const result = {
    reference:  current.reference,
  }
  return result
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: EditQuotation,
  actionCreators: [
    quotations.getOne,
    customers.getAll,
  ],
}) )
