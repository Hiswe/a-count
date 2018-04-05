import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import { Main, Content } from '../../components/layout/main.jsx'
import NavSecondary from '../../components/nav/secondary.jsx'
import { ButtonNew } from '../../components/nav/secondary-buttons.jsx'
import { BtnFab } from '../../components/ui/buttons.jsx'
import Icon from '../../components/ui/svg-icons.jsx'
import QuotationsList from '../../components/quotations/list.jsx'

const TYPE = `quotations`

function Quotations( props ) {
  const { intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage({
        id: `page.quotations`,
        defaultMessage: `quotations`,
      })}>
        <ButtonNew type={ TYPE } />
      </NavSecondary>
      <Main>
        <Content>
          <QuotationsList />
        </Content>
      </Main>
      <BtnFab to="/quotations/new">
        <Icon svgId="note-add" />
      </BtnFab>
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: injectIntl( Quotations ),
  actionCreators: [
    quotations.getAll,
  ],
}) )
