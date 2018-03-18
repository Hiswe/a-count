import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ConnectDataFetcher from '../connect-data-fetcher.js'
import NavSecondary from '../components/layout/nav-secondary.jsx'

{/* <Link to="/quotations/new" className="btn-circular">+</Link> */}

function Home( props ) {
  return (
    <Fragment>
      <NavSecondary title="Home" />
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
  Component: Home,
  actionCreators: [
  ],
}) )
