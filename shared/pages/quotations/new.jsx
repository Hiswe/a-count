import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/nav/secondary.jsx'
import QuotationForm from '../../components/quotations/form.jsx'
import { ButtonList, ButtonSubmit } from '../../components/quotations/secondary-nav-actions.jsx'

function NewQuotation( props ) {
  const { intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage({id: `page.quotations.new`})}>
        <ButtonList />
        <ButtonSubmit isSaving={ props.isSaving } />
      </NavSecondary>
      <QuotationForm {...props} />
    </Fragment>
  )
}

function state2prop( state ) {
  const { isSaving } = state.quotations
  return { isSaving }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: injectIntl( NewQuotation ),
  actionCreators: [
    customers.getAll,
    quotations.getOne,
  ],
}) )
