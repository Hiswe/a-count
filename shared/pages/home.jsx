import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import ConnectDataFetcher from '../connect-data-fetcher.js'
import * as account from '../ducks/account.js'
import * as quotations from '../ducks/quotations.js'
import * as invoices from '../ducks/invoices.js'
import NavSecondary from '../components/nav/secondary.jsx'
import { ButtonNew } from '../components/nav/secondary-buttons.jsx'
import { Main, Content } from '../components/layout/main.jsx'
import QuotationsList from '../components/quotations/list.jsx'
import InvoicesList from '../components/invoices/list.jsx'
import { PieChart } from '../components/ui/pie-chart.jsx'

function Home( props ) {
  const {
    statistics,
    quotationsActive,
    quotationsReadyToInvoice,
    invoices,
  } = props

  return (
    <Fragment>
      <NavSecondary
        title={ <FormattedMessage id="page.home"/> }
      >
        <ButtonNew type="quotations" />
      </NavSecondary>
      <Main>
        <Content>
          <div style={{display: `grid`, gridGap: `2rem`, gridTemplateColumns: `1fr 1fr`}}>
            <PieChart
              title="count"
              slices={[
                {label: `quotations` , value: statistics.quotationsCount },
                {label: `invoices`   , value: statistics.invoicesCount   },
              ]}
            />
            <PieChart
              title="amount"
              slices={[
                {label: `quotations`  , value: statistics.quotationsTotal   },
                {label: `invoice left`, value: statistics.invoicesTotalLeft },
                {label: `invoice paid`, value: statistics.invoicesTotalPaid },
              ]}
            />
          </div>
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
    statistics              : state.account.get(`statistics`),
    quotationsActive        : state.quotations.get( `active` ),
    quotationsReadyToInvoice: state.quotations.get( `readyToInvoice` ),
    invoices                : state.invoices.get( `list` ),
  }
}

export default connect( state2props )( ConnectDataFetcher({
  Component: Home,
  actionCreators: [
    quotations.getActive,
    quotations.getReadyToInvoice,
    invoices.getAll,
    account.statistics,
  ],
}) )
