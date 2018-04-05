import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers.js'
import { Main, Content } from '../../components/layout/main.jsx'
import NavSecondary from '../../components/nav/secondary.jsx'
import { ButtonNew } from '../../components/nav/secondary-buttons.jsx'
import CustomersTable from '../../components/customers/list.jsx'

const TYPE = `customers`

function Customers( props ) {
  const { intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage({
        id: `page.customers`,
        defaultMessage: `customers`,
      })}>
        <ButtonNew secondary  type={ TYPE } />
      </NavSecondary>
      <Main>
        <Content>
          <CustomersTable />
        </Content>
      </Main>
      <ButtonNew fab type={ TYPE } />
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: injectIntl( Customers ),
  actionCreators: [
    customers.getAll
  ],
}) )
