import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/layout/nav-secondary.jsx'
import QuotationForm from '../../components/quotations/form.jsx'
import { ButtonList, ButtonNew } from '../../components/quotations/secondary-nav-actions.jsx'

// TODO: should write quotation ID
// {formData.count && '-\u00A0'}
// {formData.count && (<span>PR { formData.count+350 }</span>)}
// TODO: should have a print button

function EditQuotation( props ) {
  return (
    <Fragment>
      <NavSecondary title="Edit Quotation">
        <ButtonNew />
        <ButtonList />
      </NavSecondary>
      <QuotationForm {...props} />
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: EditQuotation,
  actionCreators: [
    quotations.getOne,
    customers.getAll,
  ],
}) )

