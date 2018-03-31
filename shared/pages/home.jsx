import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedHTMLMessage } from 'react-intl'

import ConnectDataFetcher from '../connect-data-fetcher.js'
import * as quotations from '../ducks/quotations'
import NavSecondary from '../components/nav/secondary.jsx'
import { ButtonNew as NewQuotation } from '../components/quotations/secondary-nav-actions.jsx'
import Main from '../components/layout/main.jsx'
import QuotationsList from '../components/quotations/list.jsx'

function Home( props ) {
  const { intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage({id: `page.home`})}>
        <NewQuotation />
      </NavSecondary>
      <Main
        content={() => (
          <Fragment>
            <h3>
              <FormattedHTMLMessage id="page.quotations" />
            </h3>
            <QuotationsList />
          </Fragment>
        )}
      />
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: injectIntl( Home ),
  actionCreators: [
    quotations.getAll,
  ],
}) )
