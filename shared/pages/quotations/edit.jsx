import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/layout/nav-secondary.jsx'
import { computeFakeId } from '../../components/ui/fake-id.jsx'
import QuotationForm from '../../components/quotations/form.jsx'
import { ButtonList, ButtonNew } from '../../components/quotations/secondary-nav-actions.jsx'

// TODO: should have a print button

function EditQuotation( props ) {
  const count = props.quotation.index
  const { prefix, startAt } = props.user.defaultQuotation
  const fakeId = computeFakeId({count, prefix, startAt})
  const title = `Edit Quotation – ${fakeId}`

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
    quotation:  state.quotations.current,
    user:       state.users.current,
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
