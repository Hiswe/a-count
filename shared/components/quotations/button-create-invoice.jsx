import React from 'react'
import { FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as quotations from '../../ducks/quotations'
import { Button } from '../ui/buttons.jsx'
import { FORM_ID } from './form.pres.jsx'

function ButtonCreateInvoice( props ) {
  const { quotation, createInvoice, isSaving, ...others } = props
  if ( !quotation ) return null
  const id          = quotation.get(`id`         )
  const isAvailable = quotation.get(`_canCreateInvoice`)
  if ( !isAvailable ) return null

  const btnProps = {
    onClick: event => {
      event.preventDefault()
      createInvoice({params: {id}})
    },
    type      : `submit`                     ,
    formMethod: `post`                       ,
    formAction: `/quotations/${ id }/create-invoice`,
    disabled  : isSaving                     ,
    ...others
  }
  return (
    <Button secondary
      {...btnProps}
    >
      <FormattedMessage id="quotation.invoice.create" />
    </Button>
  )
}

function state2prop( state ) {
  return {
    isSaving: state.quotations.get( `isSaving` ),
  }
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
    createInvoice: quotations.createInvoice
  }, dispatch)
}

export default connect( state2prop, dispatch2prop )( ButtonCreateInvoice )
