import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import { Main, Content } from '../../components/layout/main.jsx'
import NavSecondary from '../../components/nav/secondary.jsx'
import { ButtonNew } from '../../components/nav/secondary-buttons.jsx'
import QuotationsList from '../../components/quotations/list.jsx'

const TYPE = `quotations`

function Quotations( props ) {
  return (
    <Fragment>
      <NavSecondary
        title={ <FormattedMessage id="page.quotations" /> }
      >
        <ButtonNew secondary type={ TYPE } />
      </NavSecondary>
      <Main>
        <Content>
          <QuotationsList />
        </Content>
      </Main>
      <ButtonNew fab type={ TYPE } />
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: Quotations,
  actionCreators: [
    quotations.getAll,
  ],
}) )
