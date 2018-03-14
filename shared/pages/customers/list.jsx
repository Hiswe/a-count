import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers.js'
import FullPage from '../../components/layout/full-page.jsx'
import CustomersTable from '../../components/customers/list.jsx'
import { ButtonNew } from '../../components/customers/secondary-nav-actions.jsx'

const Customers = props => {
  return (
    <FullPage title="Customers" secondary={ ButtonNew }>
      <Link to="/customers/new" className="btn-fab">+</Link>
      <div className="page__content">
        <CustomersTable />
      </div>
    </FullPage>
  )
}

export default connect()( ConnectDataFetcher({
  Component: Customers,
  actionCreators: [
    customers.getAll
  ],
}) )
