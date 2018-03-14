import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import FullPage from '../../components/layout/full-page.jsx'
import QuotationForm from '../../components/quotations/form.jsx'
import { ButtonList } from '../../components/quotations/secondary-nav-actions.jsx'

const NewQuotation = props => {
  return (
    <FullPage title="New Quotation" secondary={ButtonList} >
      <div className="page__content">
        <QuotationForm {...props} />
      </div>
    </FullPage>
  )
}

export default connect()( ConnectDataFetcher({
  Component: NewQuotation,
  actionCreators: [
    customers.getAll,
    quotations.getOne,
  ],
}) )
