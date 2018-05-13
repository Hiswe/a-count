import   React                from 'react'
import   flow                 from 'lodash.flow'
import   crio                 from 'crio'
import   shortid              from 'shortid'
import   serialize            from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'

import * as invoices          from '../ducks/invoices'
import * as redirection       from '../utils/check-redirection'
import {    getInputValue   } from '../utils/get-input-value'
import {    Form            } from '../ui/form'
import {    Spinner         } from '../ui/spinner'
import      InvoiceFormPres   from './form.pres'

export const FORM_ID = `invoice-form`

function updatePayments( formData ) {
  const payments        = formData.get( `payments` )
  if ( !crio.isArray(payments) ) return formData
  const updatedPayments = payments
    .filter( payment => payment.message || payment.date || payment.amount )
    .map( payment => {
      if (!payment._id) return payment.set( `_id`, shortid() )
      return payment
    } )
    .push(crio({
      _id:      shortid(),
      message:  ``,
      date:     ``,
      amount:   0,
    }))
  return formData.set( `payments`, updatedPayments )
}
function removeLine({ index, formData }) {
  const payments = formData.get( `payments` )
  if ( !crio.isArray(payments) ) return formData
  return formData.set( `payments`, payments.splice( index, 1 ))
}
function recomputeTotals( formData ) {
  const payments = formData.get( `payments` )
  if ( !crio.isArray(payments) ) return formData
  const total = formData.get( `total` )
  const paid  = payments
    .reduce( (acc, payment) => parseFloat(payment.amount, 10) + acc, 0)
  const left  = total - paid
  return formData
    .set(`totalPaid`, paid )
    .set(`totalLeft`, left )
}
function updatePaymentsFieldPath( formData ) {
  const payments = formData.get( `payments` )
  if ( !crio.isArray(payments) ) return formData
  const updated   = payments.map( (payment, index) => {
    return payment.set(`_fieldPath`, `payments[${index}]`)
  })
  return formData.set( `payments`, updated )
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
    const   next                = nextProps.invoice
    const   current             = prevState.formData
    const { history, serverContext, isSaving } = nextProps
    if ( isSaving ) return null
    if ( current === next ) return null

    // redirects
    redirection.invoice({
      next,
      current,
      history,
      serverContext,
    })

    return { formData: InvoiceForm.updatePayments( next ) }
  }

  //----- UTILS

  static isPaymentFieldName( inputName ) {
    return /^payments\[\d+\]/.test( inputName )
  }

  static updatePayments = flow(
    updatePayments,
    updatePaymentsFieldPath,
    recomputeTotals,
  )
  static removeLine = flow(
    removeLine,
    updatePaymentsFieldPath,
    recomputeTotals,
  )

  //----- EVENTS

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true, empty: true } )
    this.props.save({ body })
  }
  handleFormChange( event ) {
    const { name, value } = getInputValue( event.target )

    this.setState( prevState => {
      let updated           = prevState.formData.set( name, value )
      const isPaymentChange = InvoiceForm.isPaymentFieldName( name )
      if ( isPaymentChange ) updated = InvoiceForm.updatePayments( updated )
      return { formData: updated }
    })
  }
  handleDayChange( target ) {
    return this.handleFormChange({target})
  }
  handleRemovePayment( index ) {
    this.setState( prevState => {
      const { formData } = prevState
      const updated      = InvoiceForm.removeLine( {formData, index} )
      return { formData: updated }
    })
  }

  //----- RENDER

  render() {
    const { isSaving, isLoading } = this.props
    const { formData } = this.state
    if ( isLoading ) return <Spinner />

    const renderProps = {
      invoice: formData,
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
