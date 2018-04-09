import React, { Fragment } from 'react'
import crio from 'crio'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/nav/secondary.jsx'
import {
  ButtonList,
  ButtonSubmit,
} from '../../components/nav/secondary-buttons.jsx'
import CustomerForm from '../../components/customers/form.jsx'
import { FORM_ID } from '../../components/customers/form.pres.jsx'

const TYPE = `customers`

const NewCustomer = props => {
  const { intl } = props

  return (
    <Fragment>
      <NavSecondary
        title={ <FormattedMessage id="page.customers.new" /> }
      >
        <ButtonList type={ TYPE } />
        <ButtonSubmit formId={ FORM_ID } isSaving={ props.isSaving } />
      </NavSecondary>
      <CustomerForm {...props} />
    </Fragment>
  )
}

function state2prop( state ) {
  return {
    isSaving  : state.customers.get( `isSaving` ),
    quotations: crio([]),
    invoices  : crio([]),
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: NewCustomer,
  actionCreators: [
    customers.getOne
  ],
}) )

