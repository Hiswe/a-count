import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import { Main, Content } from '../../components/layout/main.jsx'
import NavSecondary from '../../components/nav/secondary.jsx'
import { ButtonList, ButtonNew, ButtonEdit } from '../../components/quotations/secondary-nav-actions.jsx'
import PrintQuotation from '../../components/quotations/print.jsx'

function PrintQuotationPage( props ) {
  const { reference, intl } = props
  const { id } = props.match.params

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage(
        {id: `page.quotations.print`},
        {reference: props.reference}
      )}>
        <ButtonNew />
        <ButtonList />
        <ButtonEdit id={id} />
      </NavSecondary>
      <Main>
        <Content>
          <PrintQuotation />
        </Content>
      </Main>
    </Fragment>
  )
}

function state2prop( state ) {
  const { current } = state.quotations
  const result = {
    reference:  current.reference
  }
  return result
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: injectIntl( PrintQuotationPage ),
  actionCreators: [
    quotations.getOne,
  ],
}) )

