import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as customers from '../redux-ducks/customers'
import * as formDraft from '../redux-ducks/form-draft'
import * as redirection from '../utils/check-redirection'
import Spinner from '../ui/spinner'
import { Form } from '../ui/form'

export const FORM_ID = `customer-form`

export const FormContext = React.createContext({})

class CustomerForm extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   formData: props.customer,
    // }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
  }
  // static getDerivedStateFromProps(props, state) {
  //   const next = props.customer
  //   const current = state.formData
  //   const { isSaving, history, serverContext } = props
  //   if (isSaving) return null
  //   if (current === next) return null
  //   if (next.id !== current.id) {
  //     // redirects
  //     const redirect = redirection.customer({
  //       next,
  //       current,
  //       history,
  //       serverContext,
  //     })
  //     if (redirect) return null
  //     return { formData: next }
  //   }
  //   if (next.updatedAt === current.updatedAt) return null
  //   return null
  // }

  //----- EVENTS

  handleSubmit(event) {
    event.preventDefault()
    const body = serialize(event.target, { hash: true, empty: true })
    this.props.saveOne({ body })
  }
  handleFormChange(event) {
    const { props } = this
    const { target } = event
    const { name, value } = target
    props.updateDraft(props.formDraft.set(name, value))
  }

  //----- RENDER

  render() {
    const { props } = this
    const { isSaving, formDraft } = props
    if (formDraft.isLoading) return <Spinner />
    const formProps = { isSaving, formDraft }

    return (
      <Form
        id={`${FORM_ID}`}
        isSaving={props.isSaving}
        onSubmit={this.handleSubmit}
        onChange={this.handleFormChange}
      >
        {formDraft.id && <input type="hidden" value={formDraft.id} name="id" />}
        {/* Provide a context for children to be able to access formData */}
        <FormContext.Provider value={formProps}>
          {this.props.children}
        </FormContext.Provider>
      </Form>
    )
  }
}

function state2props(state) {
  return { formDraft: state.formDraft }
}

function dispatch2props(dispatch) {
  return bindActionCreators(
    {
      saveOne: customers.saveOne,
      updateDraft: formDraft.updateDraft,
    },
    dispatch
  )
}

export default connect(
  state2props,
  dispatch2props
)(CustomerForm)
