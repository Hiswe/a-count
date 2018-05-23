import   React              from 'react'
import { connect          } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Helmet           } from 'react-helmet'

import      pageFetchActions             from '../page-fetch-actions'
import * as invoices                     from '../redux-ducks/invoices'
import {    Main             , Content } from '../layout/main'
import      NavSecondary                 from '../nav/secondary'
import {    getPreviewTitle  }           from '../utils/get-preview-title'
import {
  ButtonList,
  ButtonEdit,
  ButtonPrint,
} from '../nav/secondary-buttons'
import { Preview, PrintingNotice } from '../ui/preview'

const TYPE = `invoices`

function PreviewInvoicePage( props ) {
  const { invoice } = props
  const reference   = invoice.get(`reference`)
  const { id }      = props.match.params
  const navTitle    = { id:`page.invoices.preview`, values: {reference} }

  return (
    <React.Fragment>
      <Helmet>
        <title>{getPreviewTitle(invoice)}</title>
        <html className="dark-background" />
      </Helmet>
      <NavSecondary
        title={ <FormattedMessage {...navTitle} /> }
      >
        <ButtonEdit
          type={TYPE}
          document={ invoice }
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

export default connect( state2prop )( pageFetchActions({
  Component: PreviewInvoicePage,
  actionCreators: [
    invoices.getOne,
  ],
}) )

