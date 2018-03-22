import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers.js'
import NavSecondary from '../../components/layout/nav-secondary.jsx'
import Main from '../../components/layout/main.jsx'
import { BtnFab } from '../../components/ui/buttons.jsx'
import CustomersTable from '../../components/customers/list.jsx'
import { ButtonNew } from '../../components/customers/secondary-nav-actions.jsx'

function Customers( props ) {
  return (
    <Fragment>
      <NavSecondary title="Customers">
        <ButtonNew />
      </NavSecondary>
      <Main
        content={ () => (
          <CustomersTable />
        )}
      />
      <BtnFab to="/customers/new">+</BtnFab>
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: Customers,
  actionCreators: [
    customers.getAll
  ],
}) )
