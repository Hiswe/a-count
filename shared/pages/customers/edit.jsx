import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/layout/nav-secondary.jsx'
import { ButtonList, ButtonNew, ButtonSubmit } from '../../components/customers/secondary-nav-actions.jsx'
import CustomerForm from '../../components/customers/form.jsx'

function EditCustomer( props ) {
  const { intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage({
        id: `page.customers.edit`,
        defaultMessage: `customer: {name}`,
      }, {name: props.name})}>
        <ButtonNew />
        <ButtonList />
        <ButtonSubmit isSaving={ props.isSaving } />
      </NavSecondary>
      <CustomerForm {...props} />
    </Fragment>
  )
}

function state2prop( state ) {
  const { current } = state.customers
  return {
    name:     current.name,
    isSaving: current.isSaving === true
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: injectIntl( EditCustomer ),
  actionCreators: [
    customers.getOne
  ],
}) )
