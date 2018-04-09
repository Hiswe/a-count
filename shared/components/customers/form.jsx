import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as customers from '../../ducks/customers'
import needRedirect from '../utils/need-redirection.js'
import Spinner from '../ui/spinner.jsx'
import { Form } from '../ui/form.jsx'

export const FORM_ID = `customer-form`

export const FormContext = React.createContext({})

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
    const   current             = prevState.formData
    const   next                = nextProps.customer
    const { isSaving, history } = nextProps
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
      formData,
      isSaving,
    }

    return (
      <Form
        id={ `${FORM_ID}` }
        isSaving={ isSaving }
        onSubmit={ this.handleSubmit }
        onChange={ this.handleFormChange }
      >
        { formData.id && <input type="hidden" value={formData.id} name="id" />  }
        <FormContext.Provider value={ formProps }>
          { this.props.children }
        </FormContext.Provider>
      </Form>
    )
  }
}

function dispatch2props( dispatch ) {
  return bindActionCreators({
    saveOne:  customers.saveOne,
  }, dispatch)
}

export default connect( null, dispatch2props )( CustomerForm )
