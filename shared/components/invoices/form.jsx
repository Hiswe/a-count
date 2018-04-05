import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import serialize from 'form-serialize'

import * as invoices from '../../ducks/invoices'

import Spinner         from '../ui/spinner.jsx'
import InvoiceFormPres from './form.pres.jsx'

class InvoiceForm extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      formData: props.invoice,
    }
    this.handleSubmit      = this.handleSubmit.bind( this )
    this.handleFormChange  = this.handleFormChange.bind( this )
    this.handleDayChange   = this.handleDayChange.bind( this )
  }

  static getDerivedStateFromProps( nextProps, prevState ) {
    const   current = prevState.formData
    const   next    = nextProps.invoice
    const { isSaving } = nextProps
    if ( isSaving ) return null
    if ( current === next ) return null
    return { formData: next }
  }

  //----- EVENTS

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true, empty: true } )
    this.props.save( {params: {body}} )
  }

  handleFormChange( event ) {
    const { target } = event
    const { name, value } = target
    console.log( { name, value } )
  }

  handleDayChange( target ) {
    const { name, value } = target
    console.log( {name, value })
    this.setState( prevState => {
      console.log(prevState.formData.get( name))
      const updated = prevState.formData.set( name, value )
      console.log(updated.get( name))
      return { formData: updated }
    })
  }

  //----- RENDER

  render() {
    const { isSaving, isLoading } = this.props
    if ( isLoading ) return <Spinner />

    const renderProps = {
      user            : this.props.user,
      formData        : this.state.formData,
      handle: {
        submit    : this.handleSubmit,
        formChange: this.handleFormChange,
        dayChange : this.handleDayChange,
      },
    }
    return <InvoiceFormPres {...renderProps}/>
  }
}

function state2prop( state ) {
  return {
    isSaving : state.invoices.get( `isSaving` ),
    invoice  : state.invoices.get( `current` ),
    isLoading: state.invoices.get( `current.isLoading` ),
    user     : state.account.get( `current` ),
  }
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
    save: invoices.saveOne,
  }, dispatch)
}

export default connect( state2prop, dispatch2prop )( InvoiceForm )
