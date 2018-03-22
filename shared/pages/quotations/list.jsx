import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import NavSecondary from '../../components/layout/nav-secondary.jsx'
import Main from '../../components/layout/main.jsx'
import { BtnFab } from '../../components/ui/buttons.jsx'
import { ButtonNew } from '../../components/quotations/secondary-nav-actions.jsx'
import QuotationsList from '../../components/quotations/list.jsx'

function Quotations( props ) {
  return (
    <Fragment>
      <NavSecondary title="Quotations">
        <ButtonNew />
      </NavSecondary>
      <Main
        content={() => (
          <QuotationsList {...props} />
        )}
      />
      <BtnFab to="/quotations/new">+</BtnFab>
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: Quotations,
  actionCreators: [
    quotations.getAll
  ],
}) )
