import React from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'

import { Button } from '../ui/buttons.jsx'

function ButtonShowInvoice( props ) {
  const { quotation, withMessage, isSaving } = props
  if ( !quotation ) return null

  const invoiceId = quotation.get(`invoiceId`)
  if ( !invoiceId ) return null
  return (
    <Button secondary
      to={`/invoices/${ invoiceId }` }
      disabled={ isSaving }
    >
      {
        withMessage ? <FormattedMessage id="quotation.invoice.show" />
          : quotation.get(`invoice.reference`)
      }
    </Button>
  )
}

function state2prop( state ) {
  return {
    isSaving : state.quotations.get( `isSaving` ),
  }
}

export default connect( state2prop )( ButtonShowInvoice )
