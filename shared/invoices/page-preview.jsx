import   React              from 'react'
import { connect          } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Helmet           } from 'react-helmet'

import      ConnectDataFetcher            from '../connect-data-fetcher.js'
import * as invoices                      from '../ducks/invoices'
import {    Main              , Content } from '../layout/main.jsx'
import      NavSecondary                  from '../nav/secondary.jsx'
import {
  ButtonList,
  ButtonEdit,
  ButtonPrint,
} from '../nav/secondary-buttons.jsx'
import { Preview, PrintingNotice } from '../ui/preview.jsx'

const TYPE = `invoices`

function PreviewInvoicePage( props ) {
  const { invoice } = props
  const reference = invoice.get(`reference`)
  const { id } = props.match.params
  const titleProps  = { id:`page.invoices.preview`, values: {reference} }

  return (
    <React.Fragment>
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
        <ButtonEdit
          type={TYPE}
          id={id}
          label="_.edit"
        />
        <ButtonPrint />
        <ButtonList
          type={TYPE}
          label="invoices.button.list"
        />
      </NavSecondary>
      <Main>
        <Content>
          <PrintingNotice />
          <Preview type="invoice" document={ invoice } />
        </Content>
      </Main>
    </React.Fragment>
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

