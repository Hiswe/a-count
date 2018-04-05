import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/nav/secondary.jsx'
import {
  ButtonNew,
  ButtonList,
} from '../../components/nav/secondary-buttons.jsx'
import { ButtonSubmit } from '../../components/customers/secondary-nav-actions.jsx'
import CustomerForm from '../../components/customers/form.jsx'

const TYPE = `customers`

function EditCustomer( props ) {
  const { intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage(
        {id: `page.customers.edit`},
        {name: props.name}
      )}>
        <ButtonNew  type={ TYPE } />
        <ButtonList type={ TYPE } />
        <ButtonSubmit isSaving={ props.isSaving } />
      </NavSecondary>
      <CustomerForm {...props} />
    </Fragment>
  )
}

function state2prop( state ) {
  return {
    name:     state.customers.get( `current.name` ),
    isSaving: state.customers.get( `isSaving` ),
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: injectIntl( EditCustomer ),
  actionCreators: [
    customers.getOne
  ],
}) )
