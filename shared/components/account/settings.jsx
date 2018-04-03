import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as account from '../../ducks/account'
import SettingFormPres from './settings.pres.jsx'

class SettingForm extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      formData: this.props.current,
    }
    this.handleSubmit = this.handleSubmit.bind( this )
    this.handleFormChange = this.handleFormChange.bind( this )
  }

  static getDerivedStateFromProps( nextProps, prevState ) {
    const   current    = prevState.formData
    const   next       = nextProps.current
    const { isSaving } = nextProps
    if ( isSaving ) return null
    // update state on redux status change
    if (current === next) return null
    return { formData: next }
  }

  //----- EVENTS

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true, empty: true } )
    this.props.updateSettings( {params: {body}} )
  }
  handleFormChange( event ) {
    const { target } = event
    const { name, value } = target

    this.setState( prevState => {
      const type = typeof prevState.formData.get( name)
      const updated = prevState.formData.set( name, value )
      return { formData: updated }
    })
  }

  //----- RENDER

  render() {
    const { formData } = this.state
    const { isSaving } = this.props

    const renderProps = {
      formData,
      isSaving,
      handleSubmit: this.handleSubmit,
      handleFormChange: this.handleFormChange,
    }

    return (
      <SettingFormPres {...renderProps} />
    )
  }
}

function state2props( state ) {
  return {
    current : state.account.current,
    isSaving: state.account.isSaving,
  }
}

function dispatch2props ( dispatch ) {
  return bindActionCreators({
    updateSettings: account.updateSettings,
  }, dispatch )
}

export default connect( state2props, dispatch2props )( SettingForm )
