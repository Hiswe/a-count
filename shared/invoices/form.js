import   React                from 'react'
import   crio                 from 'crio'
import   shortid              from 'shortid'
import   serialize            from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'

import * as invoices          from '../ducks/invoices'
import {    Form            } from '../ui/form'
import {    Spinner         } from '../ui/spinner'
import      InvoiceFormPres   from './form.pres'

export const FORM_ID = `invoice-form`

function isPaymentFieldName( inputName ) {
  return /^payments\[\d+\]/.test( inputName )
}
function isAmountFieldName( inputName ) {
  return /^payments\[\d+\]\[amount\]/.test( inputName )
}

class InvoiceForm extends React.Component {

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
    this.props.save({ body })
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
    const { formData } = this.state
    if ( isLoading ) return <Spinner />

    const renderProps = {
      formData,
      handle: {
        dayChange     : this.handleDayChange,
        removePayment : this.handleRemovePayment,
      },
    }
    return (
      <Form
        id={ FORM_ID }
        isSaving={ isSaving }
        onChange={ this.handleFormChange }
        onSubmit={ this.handleSubmit }
      >
        <input type="hidden" defaultValue={ formData.get(`id`) } name="id" />
        <InvoiceFormPres {...renderProps}/>
      </Form>
    )
  }
}

function state2prop( state ) {
  return {
    isSaving : state.invoices.get( `isSaving` ),
    invoice  : state.invoices.get( `current` ),
    isLoading: state.invoices.get( `current.isLoading` ),
  }
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
    save: invoices.saveOne,
  }, dispatch)
}

export default connect( state2prop, dispatch2prop )( InvoiceForm )
