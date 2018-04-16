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
  ButtonPrint,
} from '../../components/nav/secondary-buttons.jsx'
import { Preview, PrintingNotice } from '../../components/ui/preview.jsx'

const TYPE = `invoices`

function PreviewInvoicePage( props ) {
  const { invoice } = props
  const reference = invoice.get(`reference`)
  const { id } = props.match.params
  const titleProps  = { id:`page.invoices.preview`, values: {reference} }

  return (
    <Fragment>
      <FormattedMessage {...titleProps} >
        {title => (
          <Helmet>
            <title>{title}</title>
            <body className="dark-background" />
          </Helmet>
        )}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonEdit type={TYPE} id={id} />
        <ButtonPrint />
        <ButtonList type={TYPE} />
      </NavSecondary>
      <Main>
        <Content>
          <PrintingNotice />
          <Preview type="invoice" document={ invoice } />
        </Content>
      </Main>
    </Fragment>
  )
}

function state2prop( state ) {
  return {
    invoice: state.invoices.get( `current` ),
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: PreviewInvoicePage,
  actionCreators: [
    invoices.getOne,
  ],
}) )

