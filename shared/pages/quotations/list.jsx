import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import { Main, Content } from '../../components/layout/main.jsx'
import NavSecondary from '../../components/nav/secondary.jsx'
import { ButtonNew } from '../../components/nav/secondary-buttons.jsx'
import QuotationsList from '../../components/quotations/list.jsx'

const TYPE = `quotations`

function Quotations( props ) {
  const { active, readyToInvoice } = props
  const titleProps = { id: `page.quotations` }

  return (
    <Fragment>
      <FormattedMessage {...titleProps} >
        {title => <Helmet><title>{title}</title></Helmet>}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonNew type={ TYPE } message="quotation.button.new" />
      </NavSecondary>
      <Main>
        <Content>
          <QuotationsList quotations={ active } hideInvoice />
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

function state2prop( state ) {
  return {
    active:         state.quotations.get(`active`),
    readyToInvoice: state.quotations.get(`readyToInvoice`),
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: Quotations,
  actionCreators: [
    quotations.getActive,
    quotations.getReadyToInvoice,
  ],
}) )
