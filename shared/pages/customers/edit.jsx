import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/layout/nav-secondary.jsx'
import { ButtonList, ButtonNew } from '../../components/customers/secondary-nav-actions.jsx'
import CustomerForm from '../../components/customers/form.jsx'

function EditCustomer( props ) {
  return (
    <Fragment>
      <NavSecondary title="Edit Customer">
        <ButtonNew />
        <ButtonList />
      </NavSecondary>
      <CustomerForm {...props} />
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: EditCustomer,
  actionCreators: [
    customers.getOne
  ],
}) )
