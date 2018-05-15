import   React                from 'react'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'
import { Link               } from 'react-router-dom'
import { FormattedMessage   } from 'react-intl'
import { Helmet             } from 'react-helmet'

import      pageFetchActions   from '../page-fetch-actions'
import * as quotations         from '../redux-ducks/quotations'
import * as invoices           from '../redux-ducks/invoices'
import { Main, Content            } from '../layout/main'
import { NavSecondary             } from '../nav/secondary'
import { QuotationsReadyToInvoice } from '../quotations/list'
import { ActiveInvoices           } from './list'

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

export default connect( state2props )( pageFetchActions({
  Component: Invoices,
  actionCreators: [
    invoices.listActive,
    quotations.listReadyToInvoice,
  ],
}) )
