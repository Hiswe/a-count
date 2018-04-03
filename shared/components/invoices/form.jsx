import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import serialize from 'form-serialize'

import * as invoices from '../../ducks/invoices'

import Spinner from '../ui/spinner.jsx'
import InvoiceFormPres from './form.pres.jsx'

class InvoiceForm extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      formData: props.current,
    }
    this.handleSubmit      = this.handleSubmit.bind( this )
    this.handleFormChange  = this.handleFormChange.bind( this )
  }

  //----- EVENTS

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true, empty: true } )
    console.log( { body } )
  }

  handleFormChange( event ) {
    const { target } = event
    const { name, value } = target
    console.log( { name, value } )
  }

  //----- RENDER

  render() {
    const { props     , state } = this
    const { formData          } = state
    const { isSaving          } = props
    if ( formData.isLoading ) return <Spinner />

    const renderProps = {
      user            : props.user,
      formData        : formData,
      handleSubmit    : this.handleSubmit,
      handleFormChange: this.handleFormChange,
    }
    return <InvoiceFormPres {...renderProps}/>
  }
}

function state2prop( state ) {
  const { current, isSaving } = state.invoices
  const result = {
    isSaving,
    current,
    user: state.account.get( `current` ),
  }
  return result
}

export default connect( state2prop )( InvoiceForm )
