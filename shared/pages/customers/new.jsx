import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/layout/nav-secondary.jsx'
import CustomerForm from '../../components/customers/form.jsx'
import { ButtonList } from '../../components/customers/secondary-nav-actions.jsx'

const NewCustomer = props => {
  return (
    <Fragment>
      <NavSecondary title="New Customer">
        <ButtonList />
      </NavSecondary>
      <CustomerForm {...props} />
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: NewCustomer,
  actionCreators: [
    customers.getOne
  ],
}) )

