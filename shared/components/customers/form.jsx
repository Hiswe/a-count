import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as customers from '../../ducks/customers'
import needRedirect from '../utils/need-redirection.js'

import Spinner from '../ui/spinner.jsx'
import CustomerFormPres from './form.pres.jsx'

class CustomerForm extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      formData: this.props.customer,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
  }
  static getDerivedStateFromProps( nextProps, prevState ) {
    const   current     = prevState.formData
    const   next        = nextProps.customer
    const { isSaving }  = nextProps
    if ( isSaving ) return null
    if ( current === next ) return null
    // redirect if new customer
    if ( needRedirect(current, next) ) history.push( `/customers/${next.id}` )
    return { formData: next }
  }

  //----- EVENTS

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true, empty: true } )
    this.props.saveOne( { params: {body} } )
  }
  handleFormChange( event ) {
    const { target } = event
    const { name, value } = target
    this.setState( prevState => {
      const updated = prevState.formData.set(name, value)
      return { formData: updated }
    })
  }

  //----- RENDER

  render() {
    const { formData  } = this.state
    const { isSaving  } = this.props
    const { isLoading } =      formData
    if ( isLoading ) return <Spinner />

    const formProps = {
      handleSubmit:     this.handleSubmit,
      handleFormChange: this.handleFormChange,
      formData,
      isSaving,
    }

    return <CustomerFormPres {...formProps} />
  }
}

function state2props( state ) {
  const result  = {
    isSaving: state.customers.get( `isSaving` ),
    customer: state.customers.get( `current` ),
  }
  return result
}

function dispatch2props( dispatch ) {
  return bindActionCreators({
    saveOne:  customers.saveOne,
  }, dispatch)
}

export default connect( state2props, dispatch2props )( CustomerForm )
