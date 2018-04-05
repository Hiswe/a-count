import React from 'react'
import { FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as quotations from '../../ducks/quotations'
import { Button } from '../ui/buttons.jsx'
import { FORM_ID } from './form.pres.jsx'

function ButtonCreateInvoice( props ) {
  const { id, createInvoice, isAvailable, isSaving } = props
  if ( !isAvailable ) return null
  return (
    <Button secondary
      onClick={ event => {
        event.preventDefault()
        createInvoice({params: {id}})
      }}
      type="submit"
      form={ FORM_ID }
      formMethod="post"
      formAction={`/quotations/${ id }/create-invoice` }
      disabled={ isSaving }
    >
      <FormattedMessage id="quotation.create.invoice" />
    </Button>
  )
}

function state2prop( state ) {
  return {
    id          : state.quotations.get( `current.id` ),
    isAvailable : state.quotations.get( `current._canCreateInvoice` ),
    isSaving    : state.quotations.get( `isSaving` ),
  }
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
      createInvoice: quotations.createInvoice
    }, dispatch)
}

export default connect( state2prop, dispatch2prop )( ButtonCreateInvoice )
