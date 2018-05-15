import   React                from 'react'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'
import { Link               } from 'react-router-dom'
import { FormattedMessage   } from 'react-intl'
import { Helmet             } from 'react-helmet'

import pageFetchActions   from '../page-fetch-actions'
import * as quotations    from '../redux-ducks/quotations'
import { Main, Content  } from '../layout/main'
import { NavSecondary   } from '../nav/secondary'
import { ButtonNew      } from '../nav/secondary-buttons'
import {
  ActiveQuotations,
  QuotationsReadyToInvoice,
} from './list'

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

export default connect( state2prop )( pageFetchActions({
  Component: Quotations,
  actionCreators: [
    quotations.listActive,
    quotations.listReadyToInvoice,
  ],
}) )
