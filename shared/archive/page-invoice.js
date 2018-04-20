import   React              from 'react'
import { connect          } from 'react-redux'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Helmet           } from 'react-helmet'

import      ConnectDataFetcher from '../connect-data-fetcher'
import * as invoices           from '../ducks/invoices'

import {    NavSecondary  } from '../nav/secondary'
import * as NavButtons      from '../nav/secondary-buttons'
import * as Main            from '../layout/main'
import * as KeyPres         from '../ui/key-presentation'
import {    Preview       } from '../ui/preview'
import {    InvoiceHeader } from '../invoices/header'

function ShowArchivedInvoice( props ) {
  const { invoice } = props
  const titleProps = { id: `page.archived` }

  return (
    <React.Fragment>
      {/* https://github.com/nfl/react-helmet/issues/268#issuecomment-368148249 */}
      <FormattedMessage {...titleProps} >
        {title => (
          <Helmet>
            <title>{title}</title>
            <body className="light-background" />
          </Helmet>
        )}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <NavButtons.New type="quotations" message="quotation.button.new" />
        <NavButtons.Print />
      </NavSecondary>
      <Main.Wrapper>
        <Main.Meta>
          <InvoiceHeader invoice={ invoice } />
        </Main.Meta>
        <Main.Content>
          <Preview type="invoice" document={invoice} />
        </Main.Content>
      </Main.Wrapper>
    </React.Fragment>
  )
}

export default connect(
  state => ({
    invoice: state.invoices.get(`current`),
  })
)( ConnectDataFetcher({
  Component: ShowArchivedInvoice,
  actionCreators: [
    invoices.getOne,
  ],
}) )
