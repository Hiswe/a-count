import   React              from 'react'
import { connect          } from 'react-redux'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Helmet           } from 'react-helmet'

import      pageFetchActions   from '../page-fetch-actions'
import * as quotations         from '../redux-ducks/quotations'
import * as invoices           from '../redux-ducks/invoices'

import { NavSecondary           } from '../nav/secondary'
import { ButtonNew              } from '../nav/secondary-buttons'
import { Main         , Content } from '../layout/main'
import { ArchivedQuotations     } from '../quotations/list'
import { ArchivedInvoices       } from '../invoices/list'

function ArchivedList( props ) {
  const titleProps = { id: `page.archived` }
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
          <ArchivedQuotations title="page.quotations" />
          <ArchivedInvoices   title="page.invoices"   />
        </Content>
      </Main>
    </React.Fragment>
  )
}

export default connect(
)( pageFetchActions({
  Component: ArchivedList,
  actionCreators: [
    quotations.listArchived,
    invoices.listArchived,
  ],
}) )
