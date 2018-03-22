import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/layout/nav-secondary.jsx'
import QuotationForm from '../../components/quotations/form.jsx'
import { ButtonList, ButtonSubmit } from '../../components/quotations/secondary-nav-actions.jsx'

function NewQuotation( props ) {
  return (
    <Fragment>
      <NavSecondary title="New Quotation">
        <ButtonList />
        <ButtonSubmit />
      </NavSecondary>
      <QuotationForm {...props} />
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: NewQuotation,
  actionCreators: [
    customers.getAll,
    quotations.getOne,
  ],
}) )
