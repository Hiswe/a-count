import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import FullPage from '../../components/layout/full-page.jsx'
import { ButtonList, ButtonNew } from '../../components/customers/secondary-nav-actions.jsx'
import CustomerForm from '../../components/customers/form.jsx'

const SecondaryActions = () => (
  <Fragment>
    <ButtonNew />
    <ButtonList />
  </Fragment>
)

const EditCustomer = props => {
  return (
    <FullPage title="Edit Customer" secondary={SecondaryActions}>
      <div className="page__content">
        <CustomerForm {...props} />
      </div>
    </FullPage>
  )
}

export default connect()( ConnectDataFetcher({
  Component: EditCustomer,
  actionCreators: [
    customers.getOne
  ],
}) )
