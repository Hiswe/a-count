import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../connect-data-fetcher.js'
import NavSecondary from '../components/nav/secondary.jsx'

{/* <Link to="/quotations/new" className="btn-circular">+</Link> */}

function Home( props ) {
  const { intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage({id: `page.home`})} />
      <section>
        <h3>quotations
        </h3>
        {/* <QuotationList /> */}
      </section>
      <section>
        <h3>invoices</h3>
        {/* <InvoiceList /> */}
      </section>
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: injectIntl( Home ),
  actionCreators: [
  ],
}) )
