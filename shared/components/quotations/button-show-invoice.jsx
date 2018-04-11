import React from 'react'
import { FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as quotations from '../../ducks/quotations'
import { Button } from '../ui/buttons.jsx'
import { FORM_ID } from './form.pres.jsx'

function ButtonShowInvoice( props ) {
  const { invoiceId, isSaving } = props

  if ( !invoiceId ) return null
  return (
    <Button secondary
      to={`/invoices/${ invoiceId }` }
      disabled={ isSaving }
    >
      <FormattedMessage id="quotation.invoice.show" />
    </Button>
  )
}

function state2prop( state ) {
  return {
    invoiceId: state.quotations.get( `current.invoiceId` ),
    isSaving : state.quotations.get( `isSaving` ),
  }
}

export default connect( state2prop )( ButtonShowInvoice )
