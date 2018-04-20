import   React              from 'react'
import { connect          } from 'react-redux'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Helmet           } from 'react-helmet'

import      ConnectDataFetcher from '../connect-data-fetcher'
import * as invoices           from '../ducks/invoices'

import { NavSecondary           } from '../nav/secondary'
import { ButtonNew              } from '../nav/secondary-buttons'
import { Main         , Content } from '../layout/main'
import { Preview                } from '../ui/preview'

function ShowArchivedInvoice( props ) {
  const { document } = props
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
        <ButtonNew type="quotations" message="quotation.button.new" />
      </NavSecondary>
      <Main>
        <Content>
          <Preview type="invoice" document={document} />
        </Content>
      </Main>
    </React.Fragment>
  )

}

export default connect(
  state => ({
    document: state.invoices.get(`current`),
  })
)( ConnectDataFetcher({
  Component: ShowArchivedInvoice,
  actionCreators: [
    invoices.getOne,
  ],
}) )
