import React, { Component, Fragment } from 'react'
import crio from 'crio'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import { needRedirect } from '../_helpers.js'
import filterArrayWithObject from '../_filter-array-with-object.js'

import QuotationFormPres from './form-pres.jsx'

class QuotationForm extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      formData: this.recomputeFormData( props.current ),
      customer: this.getCustomerData( props.current ),
    }

    // don't use any automated bind
    // • they are only in ES stage 2…
    //   …and it doesn't seems that it will make in stage 3
    //   https://github.com/tc39/proposal-class-fields/issues/80
    //   https://www.npmjs.com/package/@babel/plugin-proposal-class-properties
    // • but better to bind than relaying on arrow functions in render()
    // • https://codeburst.io/how-to-not-react-common-anti-patterns-and-gotchas-in-react-40141fe0dcd#aef5
    this.handleSubmit = this.handleSubmit.bind( this )
    this.handleFormChange = this.handleFormChange.bind( this )
    this.handleDayChange = this.handleDayChange.bind( this )
    this.handleProductRemove = this.handleProductRemove.bind( this )
  }

  componentWillReceiveProps( nextProps ) {
    const { history, current } = this.props
    const next = nextProps.current
    // update state on redux status change
    if (current === next) return
    // redirect if new quotation
    if ( needRedirect(current, next) ) history.push( `/quotations/${next.id}` )
    this.setState( (prevState, props) => {
      return {
        formData: this.recomputeFormData( props.current ),
        customer: this.getCustomerData( props.current ),
      }
    })
  }

  //----- UTILS

  static getSteps() {
    return [
      { key: `sendAt`,       label: `send` },
      { key: `validatedAt`,  label: `validated` },
      { key: `signedAt`,     label: `signed` },
    ]
  }
  recomputeSteps( formData ) {
    const steps = QuotationForm.getSteps().map( s => {
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
  // TODO: check if we have the right data
  recomputeProducts( formData ) {
    const defaultProduct  = formData.get( `defaultProduct` )
    const currentProducts = formData.get( `products` )
    const products = filterArrayWithObject({
      defaultObject: defaultProduct,
      array: currentProducts,
    })
      .push( Object.assign({}, defaultProduct) )
    const updated = formData.set( `products`, products )
    return updated
  }
  recomputeFormData( formData ) {
    const withSteps = this.recomputeSteps( formData )
    const withCleanProducts = this.recomputeProducts( withSteps )
    return withCleanProducts
  }
  getCustomerData( formData ) {
    const { props: { customers  } } = this
    if ( !Array.isArray(customers) ) return {}
    const { customerId } = formData
    const customer = customers.find( c => c.id === customerId )
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

    this.setState( prevState => {
      const updated = prevState.formData.set( name, value )

      // update customer state if we choose a new one
      if ( name === `customerId` ) return {
        formData: updated,
        customer: this.getCustomerData( updated )
      }

      // Recompute products only if needed
      const isProductChange = /^products\[\d+\]/.test( name )
      const isTaxChange = name === `tax`
      if ( !isProductChange && !isTaxChange ) return { formData: updated }
      return { formData: this.recomputeProducts( updated ) }
    })
  }
  handleDayChange( target ) {
    const { name, value } = target
    this.setState( prevState => {
      const updated   = prevState.formData.set( name, value )
      const withSteps = this.recomputeSteps( updated )
      return { formData: withSteps }
    })
  }
  handleProductRemove( index, prefix ) {
    const { formData } = this.state
    const line = formData.get( prefix )

    if ( !line ) return

    this.setState( prevState => {
      const updatedProducts = prevState.formData.products.splice( index, 1 )
      const updated = prevState.formData.set( `products`, updatedProducts )
      return { formData: this.recomputeProducts( updated ) }
    })
  }

  //----- RENDER

  render() {
    const { props, state } = this
    const renderProps = {
      user:             props.user,
      customers:        props.customers,
      formData:         state.formData,
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
  const { current } = state.quotations
  const isNew = current.id == null
  const result = {
    submitMsg: `${isNew ? 'Create' : 'Update'} quotation`,
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

