import   React              from 'react'
import { connect          } from 'react-redux'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Helmet           } from 'react-helmet'

import      ConnectDataFetcher from '../connect-data-fetcher'
import * as account            from '../ducks/account'
import * as quotations         from '../ducks/quotations'
import * as invoices           from '../ducks/invoices'
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

export default connect( state2props )( ConnectDataFetcher({
  Component: Home,
  actionCreators: [
    quotations.getActive,
    quotations.getReadyToInvoice,
    invoices.getAll,
    account.statistics,
  ],
}) )
