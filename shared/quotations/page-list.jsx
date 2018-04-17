import   React                from 'react'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'
import { Link               } from 'react-router-dom'
import { FormattedMessage   } from 'react-intl'
import { Helmet             } from 'react-helmet'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations    from '../../ducks/quotations'
import { Main, Content  } from '../../components/layout/main.jsx'
import { NavSecondary   } from '../../components/nav/secondary.jsx'
import { ButtonNew      } from '../../components/nav/secondary-buttons.jsx'
import {
  ActiveQuotations,
  QuotationsReadyToInvoice,
} from '../../components/quotations/list.jsx'

const TYPE = `quotations`

function Quotations( props ) {
  const titleProps = { id: `page.quotations` }

  return (
    <React.Fragment>
      <FormattedMessage {...titleProps} >
        {title => <Helmet><title>{title}</title></Helmet>}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonNew
          type={ TYPE }
          message="quotation.button.new"
        />
      </NavSecondary>
      <Main>
        <Content>
          <ActiveQuotations />
          <QuotationsReadyToInvoice />
        </Content>
      </Main>
    </React.Fragment>
  )
}

function state2prop( state ) {
  return {}
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: Quotations,
  actionCreators: [
    quotations.getActive,
    quotations.getReadyToInvoice,
  ],
}) )
