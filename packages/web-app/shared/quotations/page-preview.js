import   React              from 'react'
import { connect          } from 'react-redux'
import { injectIntl       } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { Helmet           } from 'react-helmet'

import      ConnectDataFetcher            from '../connect-data-fetcher'
import * as quotations                    from '../redux-ducks/quotations'
import {    Main              , Content } from '../layout/main'
import      NavSecondary                  from '../nav/secondary'
import {
  ButtonNew,
  ButtonList,
  ButtonEdit,
  ButtonPrint,
} from '../nav/secondary-buttons'
import { Alert } from '../ui/alerts'
import { Preview, PrintingNotice } from '../ui/preview'

const TYPE = `quotations`

function PreviewQuotationPage( props ) {
  const { id } = props.match.params
  const { quotation } = props
  const reference     = quotation.get(`reference`)
  const titleProps    = { id:`page.quotations.preview`, values: {reference} }

  return (
    <React.Fragment>
      <FormattedMessage {...titleProps} >
        {title => (
          <Helmet>
            <title>{title}</title>
            <html className="dark-background" />
          </Helmet>
        )}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonEdit
          type={ TYPE }
          document={ quotation }
          label="_.edit"
        />
        <ButtonPrint />
        <ButtonList
          type={ TYPE }
          label="quotation.button.list"
        />
        <ButtonNew
          type={ TYPE }
          secondary
          icon
          label="quotation.button.new"
        />
      </NavSecondary>
      <Main>
        <Content>
          <PrintingNotice />
          <Preview type="quotation" document={ quotation } />
        </Content>
      </Main>
    </React.Fragment>
  )
}

function state2prop( state ) {
  return {
    quotation: state.quotations.get(`current`),
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: PreviewQuotationPage,
  actionCreators: [
    quotations.getOne,
  ],
}) )

