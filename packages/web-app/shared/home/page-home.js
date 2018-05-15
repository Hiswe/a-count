import   React              from 'react'
import { connect          } from 'react-redux'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Helmet           } from 'react-helmet'

import      pageFetchActions   from '../page-fetch-actions'
import * as account            from '../redux-ducks/account'
import * as quotations         from '../redux-ducks/quotations'
import * as invoices           from '../redux-ducks/invoices'
import { NavSecondary                } from '../nav/secondary'
import { ButtonNew                   } from '../nav/secondary-buttons'
import { Main         , Content      } from '../layout/main'
import { ActiveInvoices } from  '../invoices/list'
import {
  ActiveQuotations,
  QuotationsReadyToInvoice,
} from '../quotations/list'
import { HomeCharts } from './charts'

function Home( props ) {
  const {
    statistics,
    quotationsReadyToInvoice,
    invoices,
  } = props
  const titleProps = { id: `page.home` }

  return (
    <React.Fragment>
      {/* https://github.com/nfl/react-helmet/issues/268#issuecomment-368148249 */}
      <FormattedMessage {...titleProps} >
        {title => <Helmet><title>{title}</title></Helmet>}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonNew type="quotations" message="quotation.button.new" />
      </NavSecondary>
      <Main>
        <Content>
          <HomeCharts statistics={ statistics } />
          <ActiveQuotations title="page.quotations" />
          <QuotationsReadyToInvoice />
          <ActiveInvoices title="page.invoices" />
        </Content>
      </Main>
    </React.Fragment>
  )
}

function state2props( state ) {
  return {
    statistics : state.account .get( `statistics` ),
  }
}

export default connect( state2props )( pageFetchActions({
  Component: Home,
  actionCreators: [
    quotations.listActive,
    quotations.listReadyToInvoice,
    invoices.listActive,
    account.statistics,
  ],
}) )
