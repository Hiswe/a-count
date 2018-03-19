import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as customers from '../../ducks/customers'
import { needRedirect } from '../_helpers.js'
import Main from '../layout/main.jsx'
import Field from '../ui/field.jsx'

class CustomerForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      formData: this.props.current,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
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
    const { current } = props
    const { formData } = state

    return (
      <form
        method="post"
        onSubmit={ this.handleSubmit }
        onChange={ this.handleFormChange }
      >
        { formData.id && <input type="hidden" defaultValue={formData.id} name="id" />  }
        <Main
          content={() => (
            <Fragment>
              <fieldset>
                <Field
                  name="name"
                  value={ formData.name }
                />
                <Field
                  name="address"
                  type="textarea"
                  value={ formData.address }
                />
              </fieldset>
              <div className="actions">
                <button className="btn" type="submit">{props.submitMsg}</button>
              </div>
            </Fragment>
          )}
        />
      </form>
    )
  }
}

function state2props( state ) {
  const { current } = state.customers
  const isNew   = current.id == null
  const result  = {
    submitMsg: `${isNew ? 'Create' : 'Update'} customer`,
    isNew,
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
