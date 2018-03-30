import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/layout/nav-secondary.jsx'
import CustomerForm from '../../components/customers/form.jsx'
import { ButtonList, ButtonSubmit } from '../../components/customers/secondary-nav-actions.jsx'

const NewCustomer = props => {
  const { intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage({
        id: `page.customers.new`,
        defaultMessage: `new customer`,
      })}>
        <ButtonList />
        <ButtonSubmit />
      </NavSecondary>
      <CustomerForm {...props} />
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: injectIntl( NewCustomer ),
  actionCreators: [
    customers.getOne
  ],
}) )

