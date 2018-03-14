import React        from 'react'
import { connect }  from 'react-redux'
import { Link }     from 'react-router-dom'

import ConnectDataFetcher from '../connect-data-fetcher.js'
import FullPage from '../components/layout/full-page.jsx'

{/* <Link to="/quotations/new" className="btn-circular">+</Link> */}

const Home = () => (
  <FullPage title="Home">
    <section>
      <h3>quotations
      </h3>
      {/* <QuotationList /> */}
    </section>
    <section>
      <h3>invoices</h3>
      {/* <InvoiceList /> */}
    </section>
  </FullPage>
)

export default connect()( ConnectDataFetcher({
  Component: Home,
  actionCreators: [
  ],
}) )
