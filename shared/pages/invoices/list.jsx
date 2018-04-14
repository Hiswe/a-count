import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import * as invoices from '../../ducks/invoices'
import { Main, Content } from '../../components/layout/main.jsx'
import NavSecondary from '../../components/nav/secondary.jsx'
import { BtnFab } from '../../components/ui/buttons.jsx'
import InvoicesList from '../../components/invoices/list.jsx'
import QuotationsList from '../../components/quotations/list.jsx'

function Invoices( props ) {
  const { invoices, readyToInvoice } = props
  const titleProps  = { id:`page.invoices` }

  return (
    <Fragment>
      <FormattedMessage {...titleProps} >
        {title => <Helmet><title>{title}</title></Helmet>}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
      </NavSecondary>
      <Main>
        <Content>
          <InvoicesList invoices={ invoices } />
          { readyToInvoice.length > 0 && (
            <Fragment>
              <h3>
                <FormattedMessage id="quotation.ready-to-invoice" />
              </h3>
              <QuotationsList quotations={ readyToInvoice } />
            </Fragment>
            )}
        </Content>
      </Main>
    </Fragment>
  )
}

function state2props( state ) {
  return {
    invoices: state.invoices.get( `list` ),
    readyToInvoice: state.quotations.get(`readyToInvoice`),
  }
}

export default connect( state2props )( ConnectDataFetcher({
  Component: Invoices,
  actionCreators: [
    invoices.getAll,
    quotations.getReadyToInvoice,
  ],
}) )
