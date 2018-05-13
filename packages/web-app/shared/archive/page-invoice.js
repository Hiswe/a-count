import   React              from 'react'
import { connect          } from 'react-redux'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Helmet           } from 'react-helmet'

import      ConnectDataFetcher from '../connect-data-fetcher'
import * as invoices           from '../redux-ducks/invoices'

import {    NavSecondary  } from '../nav/secondary'
import * as NavButtons      from '../nav/secondary-buttons'
import * as Main            from '../layout/main'
import * as Tabs            from '../ui/tabs'
import {    Progress      } from '../ui/progress'
import {    Preview       } from '../ui/preview'
import {    InvoiceHeader } from '../invoices/header'
import {    InvoiceEvents } from '../invoices/events-table'
import * as Events          from '../invoices/events-read-only'

function ShowArchivedInvoice( props ) {
  const { invoice } = props
  const payments    = invoice.get( `payments` )
  const titleProps = { id: `page.archived` }

  return (
    <React.Fragment>
      {/* https://github.com/nfl/react-helmet/issues/268#issuecomment-368148249 */}
      <FormattedMessage {...titleProps} >
        {title => (
          <Helmet>
            <title>{title}</title>
            <html className="light-background" />
          </Helmet>
        )}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <NavButtons.New type="quotations" message="quotation.button.new" />
        <NavButtons.Print />
      </NavSecondary>
      <Tabs.Wrapper>
        <Tabs.List>
          <Tabs.Header>
            <InvoiceHeader invoice={ invoice } />
          </Tabs.Header>
          <Tabs.Tab>
            <FormattedMessage id="invoices.tab.payments" />
          </Tabs.Tab>
          <Tabs.Tab>
            <FormattedMessage id="invoices.tab.preview" />
          </Tabs.Tab>
        </Tabs.List>

        {/* PAYMENTS */}
        <Tabs.Panel>
          <Progress
            max={   invoice.get(`total`) }
            value={ invoice.get(`totalPaid`) }
          />
          <InvoiceEvents
            invoice={ invoice }
            hideColumns={[`action`]}
          >
            <Events.Sent
              invoice={ invoice }
            />
            { payments.map((payment, index) => (
              <Events.Payment
                key={ payment._id }
                payment={ payment }
                count={ index + 1 }
              />
            ))}
          </InvoiceEvents>
        </Tabs.Panel>

        {/* PREVIEW */}
        <Tabs.Panel>
          <Preview type="invoice" document={ invoice } />
        </Tabs.Panel>
      </Tabs.Wrapper>
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
