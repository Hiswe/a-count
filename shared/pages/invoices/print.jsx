import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as invoices from '../../ducks/invoices'
import { Main, Content } from '../../components/layout/main.jsx'
import NavSecondary from '../../components/nav/secondary.jsx'
import {
  ButtonList,
  ButtonEdit,
} from '../../components/nav/secondary-buttons.jsx'
import PrintInvoice from '../../components/invoices/print.jsx'

const TYPE = `invoices`

function PrintInvoicePage( props ) {
  const { reference } = props
  const { id } = props.match.params
  const titleProps  = { id:`page.invoices.print`, values: {reference} }

  return (
    <Fragment>
      <FormattedMessage {...titleProps} >
        {title => <Helmet><title>{title}</title></Helmet>}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonList type={TYPE} />
        <ButtonEdit type={TYPE} id={id} />
      </NavSecondary>
      <Main>
        <Content>
          <PrintInvoice />
        </Content>
      </Main>
    </Fragment>
  )
}

function state2prop( state ) {
  return {
    reference:  state.invoices.get( `current.reference` ),
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: PrintInvoicePage,
  actionCreators: [
    invoices.getOne,
  ],
}) )

