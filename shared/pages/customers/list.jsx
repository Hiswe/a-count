import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers.js'
import NavSecondary from '../../components/layout/nav-secondary.jsx'
import Main from '../../components/layout/main.jsx'
import { BtnFab } from '../../components/ui/buttons.jsx'
import Icon from '../../components/ui/svg-icons.jsx'
import CustomersTable from '../../components/customers/list.jsx'
import { ButtonNew } from '../../components/customers/secondary-nav-actions.jsx'

function Customers( props ) {
  const { intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage({
        id: `page.customers`,
        defaultMessage: `customers`,
      })}>
        <ButtonNew />
      </NavSecondary>
      <Main
        content={ () => (
          <CustomersTable />
        )}
      />
      <BtnFab to="/customers/new">
        <Icon svgId="person-add" />
      </BtnFab>
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: injectIntl( Customers ),
  actionCreators: [
    customers.getAll
  ],
}) )
