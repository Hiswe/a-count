import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as customers from '../../ducks/customers'
import { needRedirect } from '../_helpers.js'
import Field from '../ui/field.jsx'

class CustomerForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      formData: this.props.current,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    const { history, current } = this.props
    const next = nextProps.current

    // update state on redux status change
    if (current === next) return

    // redirect if new customer
    if ( needRedirect(current, next) ) history.push(`/customers/${next.id}`)

    this.setState( (prevState, props) => {
      const updated = prevState.formData.merge( null, props.current )
      return { formData: updated }
    })
  }

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true, empty: true } )
    this.props.saveOne( { params: {body} } )
  }

  handleChange( event ) {
    const { target } = event
    const { name, value } = target
    this.setState( prevState => {
      const updated = prevState.formData.set(name, value)
      return { formData: updated }
    })
  }

  render() {
    const { props, state } = this
    const { current } = props
    const { formData } = state

    return (
      <form
        method="post"
        onSubmit={ e => this.handleSubmit( e ) }
        onChange={ e => this.handleChange( e ) }
      >
        { formData.id && <input type="hidden" defaultValue={formData.id} name="id" />  }
        <fieldset>
          <Field floatingLabel
            name="name"
            value={ formData.name }
          />
          <Field floatingLabel
            name="address"
            type="textarea"
            value={ formData.address }
          />
        </fieldset>
        <div className="actions">
          <button className="btn" type="submit">{props.submitMsg}</button>
        </div>
      </form>
    )
  }
}

const state2props = state => {
  const { current } = state.customers
  const isNew   = current.id == null
  const result  = {
    submitMsg: `${isNew ? 'Create' : 'Update'} customer`,
    isNew,
    current,
  }
  return result
}

const dispatch2props = dispatch => {
  return bindActionCreators({
    saveOne:  customers.saveOne,
  }, dispatch)
}

export default connect( state2props, dispatch2props )( CustomerForm )
