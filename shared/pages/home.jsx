import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import ConnectDataFetcher from '../connect-data-fetcher.js'
import * as quotations from '../ducks/quotations.js'
import * as invoices from '../ducks/invoices.js'
import NavSecondary from '../components/nav/secondary.jsx'
import { ButtonNew } from '../components/nav/secondary-buttons.jsx'
import { Main, Content } from '../components/layout/main.jsx'
import QuotationsList from '../components/quotations/list.jsx'
import InvoicesList from '../components/invoices/list.jsx'

function Home( props ) {
  const { invoices, quotationsActive, quotationsReadyToInvoice } = props

  return (
    <Fragment>
      <NavSecondary
        title={ <FormattedMessage id="page.home"/> }
      >
        <ButtonNew type="quotations" />
      </NavSecondary>
      <Main>
        <Content>
          <h3>
            <FormattedMessage id="page.quotations" />
          </h3>
          <QuotationsList quotations={ quotationsActive } />
          { quotationsReadyToInvoice.length > 0 && (
          <Fragment>
            <h3>
              <FormattedMessage id="quotation.ready-to-invoice" />
            </h3>
            <QuotationsList quotations={ quotationsReadyToInvoice } />
          </Fragment>
          )}
          <h3>
            <FormattedMessage id="page.invoices" />
          </h3>
          <InvoicesList invoices={ invoices } />
        </Content>
      </Main>
    </Fragment>
  )
}

function state2props( state ) {
  return {
    quotationsActive:         state.quotations.get( `active` ),
    quotationsReadyToInvoice: state.quotations.get( `readyToInvoice` ),
    invoices:   state.invoices.get( `list` ),
  }
}

export default connect( state2props )( ConnectDataFetcher({
  Component: Home,
  actionCreators: [
    quotations.getActive,
    quotations.getReadyToInvoice,
    invoices.getAll,
  ],
}) )
