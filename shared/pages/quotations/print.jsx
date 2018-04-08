import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import { Main, Content } from '../../components/layout/main.jsx'
import NavSecondary from '../../components/nav/secondary.jsx'
import {
  ButtonNew,
  ButtonList,
  ButtonEdit,
} from '../../components/nav/secondary-buttons.jsx'
import PrintQuotation from '../../components/quotations/print.jsx'

const TYPE = `quotations`

function PrintQuotationPage( props ) {
  const { reference } = props
  const { id } = props.match.params

  return (
    <Fragment>
      <NavSecondary
        title={ <FormattedMessage id="page.quotations.print" values={{reference}} /> }
      >
        <ButtonNew type={ TYPE }  />
        <ButtonList type={ TYPE } />
        <ButtonEdit type={ TYPE } id={id} />
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
  return {
    reference:  state.quotations.get(`current.reference`)
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: PrintQuotationPage,
  actionCreators: [
    quotations.getOne,
  ],
}) )

