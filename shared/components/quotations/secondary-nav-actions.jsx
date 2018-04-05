import React from 'react'
import { FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as quotations from '../../ducks/quotations'
import { Button, BtnIcon } from '../ui/buttons.jsx'
import { FORM_ID } from './form.pres.jsx'

export function ButtonSubmit( props ) {
  const { isSaving } = props
  const iconName = isSaving ? `block` : `save`

  return (
    <BtnIcon
      form={ FORM_ID }
      disabled={ isSaving }
      type="submit"
      svgId={ iconName }
    />
  )
}

function BtnCreateInvoice( props ) {
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

export const ButtonCreateInvoice = connect(
  state => ({
    id          : state.quotations.get( `current.id` ),
    isAvailable : state.quotations.get( `current._canBeTransformedToInvoice` ),
    isSaving    : state.quotations.get( `isSaving` ),
  }),
  dispatch => {
    return bindActionCreators({
      createInvoice: quotations.createInvoice
    }, dispatch)
  }
)( BtnCreateInvoice )
