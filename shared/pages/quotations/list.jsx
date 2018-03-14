import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import FullPage from '../../components/layout/full-page.jsx'
import { ButtonNew } from '../../components/quotations/secondary-nav-actions.jsx'
import QuotationsList from '../../components/quotations/list.jsx'

const Quotations = props => {
  return (
    <FullPage title="Quotations" secondary={ButtonNew}>
      <Link to="/quotations/new" className="btn-fab">+</Link>
      <div className="page__content">
        <QuotationsList {...props} />
      </div>
    </FullPage>
  )
}

export default connect()( ConnectDataFetcher({
  Component: Quotations,
  actionCreators: [
    quotations.getAll
  ],
}) )
