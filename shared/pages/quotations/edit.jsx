import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/nav/secondary.jsx'
import QuotationForm, { BASE_CLASS } from '../../components/quotations/form.jsx'
import { ButtonList, ButtonNew, ButtonSubmit, ButtonPrint,
} from '../../components/quotations/secondary-nav-actions.jsx'

function EditQuotation( props ) {
  const { reference, intl } = props
  const { id } = props.match.params

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage(
        {id: `page.quotations.edit`},
        {reference: props.reference}
      )}>
        <ButtonNew />
        <ButtonList />
        <ButtonPrint id={ id } />
        <ButtonSubmit isSaving={ props.isSaving } />
      </NavSecondary>
      <QuotationForm {...props} />
    </Fragment>
  )
}

function state2prop( state ) {
  const { current, isSaving } = state.quotations
  const result = {
    reference:  current.reference,
    isSaving,
  }
  return result
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: injectIntl( EditQuotation ),
  actionCreators: [
    quotations.getOne,
    customers.getAll,
  ],
}) )
