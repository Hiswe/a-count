import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as invoices from '../../ducks/invoices'
import { Main, Content } from '../../components/layout/main.jsx'
import NavSecondary from '../../components/nav/secondary.jsx'
import { BtnFab } from '../../components/ui/buttons.jsx'
import InvoicesList from '../../components/invoices/list.jsx'

function Invoices( props ) {
  const { invoices } = props

  return (
    <Fragment>
      <NavSecondary
        title={ <FormattedMessage id="page.invoices" /> }
      >
      </NavSecondary>
      <Main>
        <Content>
          <InvoicesList invoices={ invoices } />
        </Content>
      </Main>
    </Fragment>
  )
}

function state2props( state ) {
  return {
    invoices: state.invoices.get( `list` ),
  }
}

export default connect( state2props )( ConnectDataFetcher({
  Component: Invoices,
  actionCreators: [
    invoices.getAll
  ],
}) )
