import   React              from 'react'
import { connect          } from 'react-redux'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Helmet           } from 'react-helmet'

import      ConnectDataFetcher from '../connect-data-fetcher'
import * as quotations         from '../ducks/quotations'
import * as invoices           from '../ducks/invoices'

import { NavSecondary           } from '../nav/secondary'
import { ButtonNew              } from '../nav/secondary-buttons'
import { Main         , Content } from '../layout/main'
import { ArchivedQuotations     } from '../quotations/list'
import { ArchivedInvoices       } from '../invoices/list'

function Archived( props ) {
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
)( ConnectDataFetcher({
  Component: Archived,
  actionCreators: [
    quotations.listArchived,
    invoices.listArchived,
  ],
}) )
