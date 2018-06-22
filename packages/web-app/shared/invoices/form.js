import React from 'react'
import serialize from 'form-serialize'
import crio from 'crio'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as invoices from '../redux-ducks/invoices'
import * as formDraft from '../redux-ducks/form-draft'
import { getInputValue } from '../utils/get-input-value'
import { Form } from '../ui/form'
import { Spinner } from '../ui/spinner'
import InvoiceFormPres from './form.pres'

export const FORM_ID = `invoice-form`

class InvoiceForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleDayChange = this.handleDayChange.bind(this)
    this.handleRemovePayment = this.handleRemovePayment.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const body = serialize(event.target, { hash: true, empty: true })
    this.props.save({ body })
  }
  handleFormChange(event) {
    const { props } = this
    const { name, value } = getInputValue(event.target)
    props.updateDraft(props.formDraft.set(name, value))
  }
  handleDayChange(target) {
    return this.handleFormChange({ target })
  }
  handleRemovePayment(index) {
    const { props } = this
    const { formDraft } = props
    const payments = formDraft.get(`payments`)
    if (!crio.isArray(payments)) return
    const updated = formDraft.set(`payments`, payments.splice(index, 1))
    props.updateDraft(updated)
  }

  //----- RENDER

  render() {
    const { props } = this
    const { isSaving, isLoading, formDraft } = props

    if (isLoading) return <Spinner />

    const renderProps = {
      invoice: formDraft,
      handle: {
        dayChange: this.handleDayChange,
        removePayment: this.handleRemovePayment,
      },
    }
    return (
      <Form
        id={FORM_ID}
        isSaving={isSaving}
        onChange={this.handleFormChange}
        onSubmit={this.handleSubmit}
      >
        <input type="hidden" defaultValue={formDraft.get(`id`)} name="id" />
        <InvoiceFormPres {...renderProps} />
      </Form>
    )
  }
}

function state2props(state) {
  return {
    isSaving: state.invoices.get(`isSaving`),
    formDraft: state.formDraft,
    isLoading: state.invoices.get(`current.isLoading`),
  }
}

function dispatch2props(dispatch) {
  return bindActionCreators(
    {
      save: invoices.saveOne,
      updateDraft: formDraft.updateInvoiceDraft,
    },
    dispatch,
  )
}

export default connect(
  state2props,
  dispatch2props,
)(InvoiceForm)
