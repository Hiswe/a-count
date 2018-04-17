import React from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'

import { Button } from '../ui/buttons.jsx'

function ButtonShowQuotation( props ) {
  const { quotationId, isSaving } = props

  if ( !quotationId ) return null
  return (
    <Button secondary
      to={`/quotations/${ quotationId }` }
      disabled={ isSaving }
    >
      <FormattedMessage id="invoices.button.quotation" />
    </Button>
  )
}

function state2prop( state ) {
  return {
    quotationId: state.invoices.get( `current.quotation.id` ),
    isSaving   : state.invoices.get( `isSaving` ),
  }
}

export default connect( state2prop )( ButtonShowQuotation )
