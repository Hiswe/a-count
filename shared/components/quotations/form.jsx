import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import serialize from 'form-serialize'
import crio from 'crio'

import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import needRedirect from '../utils/need-redirection.js'
import recomputeQuotationProducts from '../utils/recompute-quotation-products.js'

import Spinner from '../ui/spinner.jsx'
import QuotationFormPres from './form.pres.jsx'

const STEPS = crio([
  { key: `sendAt`,       label: `send` },
  { key: `validatedAt`,  label: `validated` },
  { key: `signedAt`,     label: `signed` },
])

class QuotationForm extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      formData: this.constructor.recomputeFormData( props.current ),
      customer: this.constructor.getCustomerData  ( props.current ),
    }

    // don't use any automated bind
    // • they are only in ES stage 2…
    //   …and it doesn't seem that it will make in stage 3
    //   https://github.com/tc39/proposal-class-fields/issues/80
    //   https://www.npmjs.com/package/@babel/plugin-proposal-class-properties
    // • but better to bind than relying on arrow functions in render()
    //   https://codeburst.io/how-to-not-react-common-anti-patterns-and-gotchas-in-react-40141fe0dcd#aef5
    this.handleSubmit        = this.handleSubmit       .bind( this )
    this.handleFormChange    = this.handleFormChange   .bind( this )
    this.handleDayChange     = this.handleDayChange    .bind( this )
    this.handleProductRemove = this.handleProductRemove.bind( this )
  }

  static getDerivedStateFromProps( nextProps, prevState ) {
    const   current                        = prevState.formData
    const   next                           = nextProps.current
    const { history, customers, isSaving } = nextProps
    if ( isSaving ) return null
    if ( current === next ) return null
    // redirect if new customer
    if ( needRedirect(current, next) ) history.push( `/quotations/${next.id}` )
    return {
      formData: QuotationForm.recomputeFormData( next ),
      customer: QuotationForm.getCustomerData( next, customers ),
    }
  }

  //----- UTILS

  static recomputeSteps( formData ) {
    const steps = STEPS.map( s => {
      const value = formData.get( s.key )
      return {
        key: s.key,
        label: s.label,
        value,
      }
    })
    return formData.set( `steps`, steps )
  }

  // • de-dupe defaultProduct lines
  // • add an empty line a the end…
  //   …in case a user just type something on the blank one
  static recomputeProducts( formData ) {
    const defaultProduct      = formData.get( `defaultProduct` )
    const products            = formData.get( `products`       )
    const recomputedProducts  = recomputeQuotationProducts({
      defaultProduct,
      products,
    })
    const updated = formData.set( `products`, recomputedProducts )
    return updated
  }

  static recomputeFormData( formData ) {
    const withSteps = this.recomputeSteps( formData )
    return this.recomputeProducts( withSteps )
  }

  static getCustomerData( formData, customers ) {
    if ( !Array.isArray(customers) ) return {}
    const { customerId } = formData
    const customer       = customers.find( c => c.id === customerId )
    return customer || {}
  }

  //----- EVENTS

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true, empty: true } )
    this.props.saveOne( { params: {body} } )
  }
  handleFormChange( e ) {
    const { target } = e
    const { name, value } = target

    // ignore stepper presentational radio input
    if ( name === `stepper-display-form` ) return

    this.setState( (prevState, props) => {
      const type = typeof prevState.formData.get( name)
      const updated = prevState.formData.set( name, value )

      // update customer state if we choose a new one
      if ( name === `customerId` ) return {
        formData: updated,
        customer: this.constructor.getCustomerData( updated, props.customers )
      }

      // Recompute products only if needed
      const isProductChange = /^products\[\d+\]/.test( name )
      const isTaxChange = name === `tax`
      if ( !isProductChange && !isTaxChange ) return { formData: updated }
      return { formData: this.constructor.recomputeProducts( updated ) }
    })
  }
  handleDayChange( target ) {
    const { name, value } = target
    this.setState( prevState => {
      const updated   = prevState.formData.set( name, value )
      const withSteps = this.constructor.recomputeSteps( updated )
      return { formData: withSteps }
    })
  }
  handleProductRemove( index, prefix ) {
    const { formData } = this.state
    const line = formData.get( prefix )

    if ( !line ) return

    this.setState( prevState => {
      const products = prevState.formData.get( `products` )
      const updatedProducts = products.splice( index, 1 )
      const updated = prevState.formData.set( `products`, updatedProducts )
      return { formData: this.constructor.recomputeProducts( updated ) }
    })
  }

  //----- RENDER

  render() {
    const { props     , state } = this
    const { formData          } = state
    const { isSaving          } = props
    const { isLoading         } = formData
    if ( isLoading ) return <Spinner />

    const renderProps = {
      user:             props.user,
      customers:        props.customers,
      formData:         formData,
      isSaving:         isSaving,
      customer:         state.customer,
      isNew:            props.isNew,
      handleSubmit:         this.handleSubmit,
      handleFormChange:     this.handleFormChange,
      handleDayChange:      this.handleDayChange,
      handleProductRemove:  this.handleProductRemove,
    }

    return (
      <QuotationFormPres {...renderProps}/>
    )
  }
}

function state2prop( state ) {
  const { current, isSaving } = state.quotations
  const isNew = current.id == null
  const result = {
    isSaving,
    isNew,
    current,
    customers: state.customers && state.customers.list,
    user: state.users.current
  }
  return result
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
    getOne: quotations.getOne,
    saveOne: quotations.saveOne,
    getAllCustomers: customers.getAll,
  }, dispatch)
}

export default connect( state2prop, dispatch2prop )( QuotationForm )

