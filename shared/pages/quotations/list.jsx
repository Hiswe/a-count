import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import Main from '../../components/layout/main.jsx'
import NavSecondary from '../../components/nav/secondary.jsx'
import { BtnFab } from '../../components/ui/buttons.jsx'
import Icon from '../../components/ui/svg-icons.jsx'
import { ButtonNew } from '../../components/quotations/secondary-nav-actions.jsx'
import QuotationsList from '../../components/quotations/list.jsx'

function Quotations( props ) {
  const { intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage({
        id: `page.quotations`,
        defaultMessage: `quotations`,
      })}>
        <ButtonNew />
      </NavSecondary>
      <Main
        content={() => (
          <QuotationsList {...props} />
        )}
      />
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
