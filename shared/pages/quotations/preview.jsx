import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import { Main, Content } from '../../components/layout/main.jsx'
import NavSecondary from '../../components/nav/secondary.jsx'
import {
  ButtonNew,
  ButtonList,
  ButtonEdit,
} from '../../components/nav/secondary-buttons.jsx'
import { Preview } from '../../components/ui/preview.jsx'

const TYPE = `quotations`

function PreviewQuotationPage( props ) {
  const { id } = props.match.params
  const { quotation } = props
  const reference     = quotation.get(`reference`)
  const titleProps    = { id:`page.quotations.preview`, values: {reference} }

  return (
    <Fragment>
      <FormattedMessage {...titleProps} >
        {title => (
          <Helmet>
            <title>{title}</title>
            <body className="dark-background" />
          </Helmet>
        )}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonEdit type={ TYPE } id={id} />
        <ButtonList type={ TYPE } />
        <ButtonNew  type={ TYPE } secondary icon  />
      </NavSecondary>
      <Main>
        <Content>
          <Preview type="quotation" document={ quotation } />
        </Content>
      </Main>
    </Fragment>
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

