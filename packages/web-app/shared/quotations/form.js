import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import serialize from 'form-serialize'

import * as quotations from '../redux-ducks/quotations'
import * as customers from '../redux-ducks/customers'
import * as formDraft from '../redux-ducks/form-draft'
import { getInputValue } from '../utils/get-input-value'
import { Spinner } from '../ui/spinner'
import { QuotationFormPres } from './form.pres'

class QuotationForm extends React.Component {
  constructor(props) {
    super(props)

    // don't use any automated bind
    // • class fields are in ES stage 3 but they don't support auto binding
    //   https://github.com/tc39/proposal-class-fields
    // • even if babel supports it, it won't make it into the spec
    //   https://www.npmjs.com/package/@babel/plugin-proposal-class-properties
    // • this will be done with decorators support, only stage 2 right now
    //   https://github.com/littledan/proposal-decorators
    // • but better to bind than relying on arrow functions in render()
    //   https://codeburst.io/how-to-not-react-common-anti-patterns-and-gotchas-in-react-40141fe0dcd#aef5
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCreateInvoice = this.handleCreateInvoice.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleDayChange = this.handleDayChange.bind(this)
    this.handleProductRemove = this.handleProductRemove.bind(this)
  }

  //----- EVENTS

  handleSubmit(event) {
    event.preventDefault()
    const body = serialize(event.target, { hash: true, empty: true })
    this.props.saveOne({ body })
  }
  handleCreateInvoice(event) {
    event.preventDefault()
    this.props.createInvoice({
      id: this.props.current.get(`id`),
    })
  }
  handleFormChange(event) {
    const { props } = this
    const { name, value } = getInputValue(event.target)
    props.updateDraft(props.formDraft.set(name, value))
  }
  handleDayChange(target) {
    const { props } = this
    const { name, value } = target
    props.updateDraft(props.formDraft.set(name, value))
  }
  handleProductRemove(index, prefix) {
    const { props } = this
    const { formDraft } = props
    const line = formDraft.get(prefix)
    if (!line) return

    const products = prevState.formData.get(`products`)
    const updatedProducts = products.splice(index, 1)
    const updated = prevState.formData.set(`products`, updatedProducts)
    props.updateDraft(updated)
  }

  //----- RENDER

  render() {
    const { props } = this
    const { formDraft, isSaving } = props
    const { isLoading } = formDraft
    if (isLoading) return <Spinner />

    const renderProps = {
      user: props.user,
      customers: props.customers,
      formDraft: formDraft,
      isSaving: isSaving,
      isNew: props.isNew,
      handle: {
        submit: this.handleSubmit,
        createInvoice: this.handleCreateInvoice,
        formChange: this.handleFormChange,
        dayChange: this.handleDayChange,
        productRemove: this.handleProductRemove,
      },
    }

    return <QuotationFormPres {...renderProps} />
  }
}

function state2prop(state) {
  const { current } = state.quotations
  const isNew = current.id == null
  return {
    isNew,
    isSaving: state.quotations.get(`isSaving`),
    formDraft: state.formDraft,
    customers: state.customers.get(`active`),
  }
}

function dispatch2prop(dispatch) {
  return bindActionCreators(
    {
      saveOne: quotations.saveOne,
      updateDraft: formDraft.updateQuotationDraft,
      createInvoice: quotations.createInvoice,
    },
    dispatch,
  )
}

export default connect(
  state2prop,
  dispatch2prop,
)(QuotationForm)
