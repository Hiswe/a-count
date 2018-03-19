import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as users from '../../ducks/users'
import { needRedirect } from '../_helpers.js'
import UserFormPres from './form.pres.jsx'

class UserForm extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      formData: this.props.current,
    }
    this.handleSubmit = this.handleSubmit.bind( this )
    this.handleFormChange = this.handleFormChange.bind( this )
  }

  //----- EVENTS

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true, empty: true } )
    this.props.dispatch(  users.saveOne( { params: {body} } ))
  }
  handleFormChange( event ) {
    const { target } = event
    const { name, value } = target

    this.setState( prevState => {
      const updated = prevState.formData.set( name, value )
      return { formData: updated }
    })
  }

  //----- RENDER

  render() {
    const { props, state } = this
    const { formData } = state

    const renderProps = {
      formData,
      handleSubmit: this.handleSubmit,
      handleFormChange: this.handleFormChange,
    }

    return (
      <UserFormPres {...renderProps} />
    )
  }
}

const state2props = state => {
  return {
    current: state.users.current,
  }
}

export default connect( state2props )( UserForm )
