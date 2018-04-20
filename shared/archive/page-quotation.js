import   React              from 'react'
import { connect          } from 'react-redux'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Helmet           } from 'react-helmet'

import      ConnectDataFetcher from '../connect-data-fetcher'
import * as quotations         from '../ducks/quotations'
import {    NavSecondary } from '../nav/secondary'
import * as NavButtons     from '../nav/secondary-buttons'
import * as LayoutMain     from '../layout/main'
import {    Preview      } from '../ui/preview'
import * as KeyPres        from '../ui/key-presentation'
import * as Format         from '../ui/format'

function ShowArchivedQuotation( props ) {
  const { quotation } = props
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
        <NavButtons.New type="quotations" message="quotation.button.new" />
        <NavButtons.Print />
      </NavSecondary>

      <LayoutMain.Wrapper>

        <LayoutMain.Meta>
          <KeyPres.Wrapper>
            <KeyPres.Label id="key-pres.customer" />
            <KeyPres.Value>
              <Link to={`/customers/${quotation.get(`customerId`)}`}>
                { quotation.get( `customer.name` ) }
              </Link>
            </KeyPres.Value>
            {quotation.get(`invoiceId`) && (
              <React.Fragment>
                <KeyPres.Label id="key-pres.associated.invoice" />
                <KeyPres.Value>
                  <Link to={`/invoices/${quotation.get(`invoiceId`)}`}>
                    { quotation.get( `invoice.reference` ) }
                  </Link>
                </KeyPres.Value>
              </React.Fragment>
            )}
            <KeyPres.Label id="key-pres.sent" />
            <KeyPres.Value>
              <Format.Day value={quotation.get(`sendAt`)} />
            </KeyPres.Value>
            <KeyPres.Label id="key-pres.validated" />
            <KeyPres.Value>
              <Format.Day value={quotation.get(`validatedAt`)} />
            </KeyPres.Value>
            <KeyPres.Label id="key-pres.signed" />
            <KeyPres.Value>
              <Format.Day value={quotation.get(`signedAt`)} />
            </KeyPres.Value>
            <KeyPres.Label id="key-pres.total" />
            <KeyPres.Value>
              <Format.Amount value={quotation.get(`total`)} />
            </KeyPres.Value>
          </KeyPres.Wrapper>
        </LayoutMain.Meta>

        <LayoutMain.Content>
          <Preview type="quotation" document={ quotation } />
        </LayoutMain.Content>

      </LayoutMain.Wrapper>
    </React.Fragment>
  )
}


export default connect(
  state => ({
    quotation: state.quotations.get(`current`),
  })
)( ConnectDataFetcher({
  Component: ShowArchivedQuotation,
  actionCreators: [
    quotations.getOne,
  ],
}) )
