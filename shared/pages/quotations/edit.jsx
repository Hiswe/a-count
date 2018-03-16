import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import FullPage from '../../components/layout/full-page.jsx'
import QuotationForm from '../../components/quotations/form.jsx'
import { ButtonList, ButtonNew } from '../../components/quotations/secondary-nav-actions.jsx'

// TODO: should write quotation ID
// {formData.count && '-\u00A0'}
// {formData.count && (<span>PR { formData.count+350 }</span>)}
// TODO: should have a print button

const SecondaryActions = () => (
  <Fragment>
    <ButtonNew />
    <ButtonList />
  </Fragment>
)

const EditQuotation = props => {
  return (
    <FullPage title="Edit Quotation" secondary={SecondaryActions} >
      <QuotationForm {...props} />
    </FullPage>
  )
}

export default connect()( ConnectDataFetcher({
  Component: EditQuotation,
  actionCreators: [
    quotations.getOne,
    customers.getAll,
  ],
}) )

