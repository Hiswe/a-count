import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as invoices from '../../ducks/invoices'
import Main from '../../components/layout/main.jsx'
import NavSecondary from '../../components/nav/secondary.jsx'
import { BtnFab } from '../../components/ui/buttons.jsx'
import InvoiceTable from '../../components/invoices/list.jsx'

function Invoices( props ) {
  const { intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage({ id: `page.invoices` })}>
      </NavSecondary>
      <Main
        content={ () => (
          <InvoiceTable />
        )}
      />
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: injectIntl( Invoices ),
  actionCreators: [
    invoices.getAll
  ],
}) )
