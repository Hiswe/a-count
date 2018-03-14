import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import FullPage from '../../components/layout/full-page.jsx'
import CustomerForm from '../../components/customers/form.jsx'
import { ButtonList } from '../../components/customers/secondary-nav-actions.jsx'

const NewCustomer = props => {
  return (
    <FullPage title="New Customer" secondary={ButtonList} >
      <div className="page__content">
        <CustomerForm {...props} />
      </div>
    </FullPage>
  )
}

export default connect()( ConnectDataFetcher({
  Component: NewCustomer,
  actionCreators: [
    customers.getOne
  ],
}) )

