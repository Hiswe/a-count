import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as customers from '../../ducks/customers'
import { needRedirect, formatDate } from '../_helpers.js'

import Spinner from '../ui/spinner.jsx'
import CustomerFormPres from './form.pres.jsx'

class CustomerForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      formData: this.props.current,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
  }
  componentWillReceiveProps( nextProps ) {
    const { history, current } = this.props
    const next = nextProps.current

    // update state on redux status change
    if (current === next) return console.log( `state identical` )

    // redirect if new customer
    // if ( needRedirect(current, next) ) history.push(`/customers/${next.id}`)

    this.setState( (prevState, props) => {
      return { formData: props.current }
    })
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
    const { props, state } = this
    const { formData } = state

    console.log( formData )

    const { isLoading } = formData
    if ( isLoading ) return <Spinner />

    const formProps = {
      handleSubmit:     this.handleSubmit,
      handleFormChange: this.handleFormChange,
      formData,
    }

    return <CustomerFormPres {...formProps} />
  }
}

function state2props( state ) {
  const { current } = state.customers
  const result  = {
    current,
  }
  return result
}

function dispatch2props( dispatch ) {
  return bindActionCreators({
    saveOne:  customers.saveOne,
  }, dispatch)
}

export default connect( state2props, dispatch2props )( CustomerForm )
