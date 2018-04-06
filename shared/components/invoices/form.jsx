import React, { Component } from 'react'
import crio from 'crio'
import shortid from 'shortid'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import serialize from 'form-serialize'

import * as invoices from '../../ducks/invoices'

import Spinner         from '../ui/spinner.jsx'
import InvoiceFormPres from './form.pres.jsx'

function isPaymentFieldName( inputName ) {
  return /^payments\[\d+\]/.test( inputName )
}
function isAmountFieldName( inputName ) {
  return /^payments\[\d+\]\[amount\]/.test( inputName )
}

class InvoiceForm extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      formData: InvoiceForm.updatePayments( props.invoice ),
    }
    this.handleSubmit        = this.handleSubmit.bind( this )
    this.handleFormChange    = this.handleFormChange.bind( this )
    this.handleDayChange     = this.handleDayChange.bind( this )
    this.handleRemovePayment = this.handleRemovePayment.bind( this )
  }

  static getDerivedStateFromProps( nextProps, prevState ) {
    const   current = prevState.formData
    const   next    = nextProps.invoice
    const { isSaving } = nextProps
    if ( isSaving ) return null
    if ( current === next ) return null
    return { formData: InvoiceForm.updatePayments( next ) }
  }

  //----- UTILS

  static updatePayments( formData ) {
    const payments        = formData.get( `payments` )
    if ( !crio.isArray(payments) ) return crio([])
    const updatedPayments = payments
      .filter( payment => payment.date || payment.amount )
      .map( payment => {
        if (!payment._id) return payment.set( `_id`, shortid() )
        return payment
      } )
      .push(crio({
        _id:    shortid(),
        date:   ``,
        amount: 0,
      }))
      .map( (payment, index) => {
        return payment.set(`_fieldPath`, `payments[${index}]`)
      })
    return formData.set( `payments`, updatedPayments )
  }

  static recomputeTotals( formData ) {
    const total   = formData.get( `total` )
    const paid    = formData.get( `payments` )
      .reduce( (acc, payment) => parseFloat(payment.amount, 10) + acc, 0)
    const left    = total - paid
    return formData
      .set(`totalPaid`, paid )
      .set(`totalLeft`, left )
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
    this.setState( prevState => {
      let updated           = prevState.formData.set( name, value )
      const isPaymentChange = isPaymentFieldName( name )
      if ( isPaymentChange ) updated = InvoiceForm.updatePayments( updated )
      console.log( name, isAmountFieldName( name ) )
      const isAmountChange  = isAmountFieldName( name )
      if ( isPaymentChange ) updated = InvoiceForm.recomputeTotals( updated )
      return { formData: updated }
    })
  }
  handleDayChange( target ) {
    return this.handleFormChange({target})
  }
  handleRemovePayment( index, prefix ) {
    const { formData } = this.state
    const line         = formData.get( prefix )
    if ( !line ) return

    this.setState( prevState => {
      const payments = prevState.formData
        .get( `payments` )
        .splice( index, 1 )
      const updated = prevState.formData.set( `payments`, payments )
      return { formData: InvoiceForm.recomputeTotals( updated ) }
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
        submit        : this.handleSubmit,
        formChange    : this.handleFormChange,
        dayChange     : this.handleDayChange,
        removePayment : this.handleRemovePayment,
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
