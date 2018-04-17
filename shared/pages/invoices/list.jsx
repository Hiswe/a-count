import   React                from 'react'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'
import { Link               } from 'react-router-dom'
import { FormattedMessage   } from 'react-intl'
import { Helmet             } from 'react-helmet'

import      ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations         from '../../ducks/quotations'
import * as invoices           from '../../ducks/invoices'
import { Main, Content            } from '../../components/layout/main.jsx'
import { NavSecondary             } from '../../components/nav/secondary.jsx'
import { ActiveInvoices           } from '../../components/invoices/list.jsx'
import { QuotationsReadyToInvoice } from '../../components/quotations/list.jsx'

function Invoices( props ) {
  const titleProps  = { id:`page.invoices` }

  return (
    <React.Fragment>
      <FormattedMessage {...titleProps} >
        {title => <Helmet><title>{title}</title></Helmet>}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
      </NavSecondary>
      <Main>
        <Content>
          <ActiveInvoices />
          <QuotationsReadyToInvoice />
        </Content>
      </Main>
    </React.Fragment>
  )
}

function state2props( state ) {
  return {}
}

export default connect( state2props )( ConnectDataFetcher({
  Component: Invoices,
  actionCreators: [
    invoices.getAll,
    quotations.getReadyToInvoice,
  ],
}) )
