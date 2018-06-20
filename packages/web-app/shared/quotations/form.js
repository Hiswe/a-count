import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import serialize from 'form-serialize'
import crio from 'crio'
import flow from 'lodash.flow'
import shortid from 'shortid'

import * as quotations from '../redux-ducks/quotations'
import * as customers from '../redux-ducks/customers'
import * as compute from '../utils/compute-total'
import * as redirection from '../utils/check-redirection'
import { getInputValue } from '../utils/get-input-value'
import { filterArrayWithObject } from '../utils/filter-array-with-object'
import { Spinner } from '../ui/spinner'
import { QuotationFormPres } from './form.pres'

const STEPS = crio([
  { key: `sendAt`, label: `stepper.sent` },
  { key: `validatedAt`, label: `stepper.validated` },
  { key: `signedAt`, label: `stepper.signed` },
])

export function recomputeSteps(formData) {
  const steps = STEPS.map(s => {
    const value = formData.get(s.key)
    return {
      value,
      key: s.key,
      label: s.label,
    }
  })
  return formData.set(`steps`, steps)
}

// • de-dupe defaultProduct lines
// • check _id for React
export function removeDefaultProducts(formData) {
  const defaultProduct = formData.get(`productConfig`)
  const products = formData.get(`products`)
  if (!crio.isArray(products)) return formData
  if (!crio.isObject(defaultProduct)) return formData
  const cleanedProducts = filterArrayWithObject({
    defaultObject: defaultProduct,
    array: products,
  })
  return formData.set(`products`, cleanedProducts)
}

export function recomputeTotals(formData) {
  const products = formData.get(`products`)
  if (!crio.isArray(products)) return formData
  const totals = compute.totals(formData)
  return formData.merge(null, totals)
}

// • add an empty line a the end…
//   …in case a user just type something on the blank one
export function addEmptyLine(formData) {
  const defaultProduct = formData.get(`productConfig`)
  const products = formData.get(`products`)
  if (!crio.isArray(products)) return formData
  if (!crio.isObject(defaultProduct)) return formData
  const emptyProduct = defaultProduct.set(`checked`, true)
  return formData.set(`products`, products.push(emptyProduct))
}

export function ensureProductId(formData) {
  const products = formData.get(`products`)
  if (!crio.isArray(products)) return formData
  const withId = products.map(product => {
    if (!product.get(`_id`)) return product.set(`_id`, shortid())
    return product
  })
  return formData.set(`products`, withId)
}

class QuotationForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quotation: quotations.LOADING,
      formData: quotations.LOADING,
      customer: crio({}),
    }

    // don't use any automated bind
    // • they are only in ES stage 2…
    //   …and it doesn't seem that it will make in stage 3
    //   https://github.com/tc39/proposal-class-fields/issues/80
    //   https://www.npmjs.com/package/@babel/plugin-proposal-class-properties
    // • but better to bind than relying on arrow functions in render()
    //   https://codeburst.io/how-to-not-react-common-anti-patterns-and-gotchas-in-react-40141fe0dcd#aef5
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCreateInvoice = this.handleCreateInvoice.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleDayChange = this.handleDayChange.bind(this)
    this.handleProductRemove = this.handleProductRemove.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const next = nextProps.current
    const current = prevState.formData
    const { history, serverContext, customers, isSaving } = nextProps
    if (isSaving) return null
    if (current === next) return null
    if (next.updatedAt === current.updatedAt) return null

    // redirects
    redirection.quotation({
      next,
      current,
      history,
      serverContext,
    })

    return {
      formData: QuotationForm.recomputeFormData(next),
      customer: QuotationForm.getCustomerData(next, customers),
    }
  }

  //----- UTILS

  static recomputeSteps = recomputeSteps

  static recomputeProducts = flow(
    removeDefaultProducts,
    recomputeTotals,
    addEmptyLine,
    ensureProductId
  )

  static recomputeFormData = flow(
    QuotationForm.recomputeSteps,
    QuotationForm.recomputeProducts
  )

  static getCustomerData(formData, customers) {
    if (!Array.isArray(customers)) return {}
    const { customerId } = formData
    // if no customer is selected, just take the first one in the list
    if (!customerId) return customers[0]
    const customer = customers.find(c => c.id === customerId)
    return customer || {}
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
    const { name, value } = getInputValue(event.target)

    this.setState((prevState, props) => {
      const updated = prevState.formData.set(name, value)

      // update customer state if we choose a new one
      if (name === `customerId`)
        return {
          formData: updated,
          customer: QuotationForm.getCustomerData(updated, props.customers),
        }
      // Recompute products only if needed
      const isProductChange = /^products\[\d+\]/.test(name)
      const isTaxChange = name === `tax`
      if (!isProductChange && !isTaxChange) return { formData: updated }
      console.log(QuotationForm.recomputeProducts(updated))
      return { formData: QuotationForm.recomputeProducts(updated) }
    })
  }
  handleDayChange(target) {
    const { name, value } = target
    this.setState(prevState => {
      const updated = prevState.formData.set(name, value)
      const withSteps = QuotationForm.recomputeSteps(updated)
      return { formData: withSteps }
    })
  }
  handleProductRemove(index, prefix) {
    const { formData } = this.state
    const line = formData.get(prefix)
    if (!line) return

    this.setState(prevState => {
      const products = prevState.formData.get(`products`)
      const updatedProducts = products.splice(index, 1)
      const updated = prevState.formData.set(`products`, updatedProducts)
      return { formData: QuotationForm.recomputeProducts(updated) }
    })
  }

  //----- RENDER

  render() {
    const { props, state } = this
    const { formData } = state
    const { isSaving } = props
    const { isLoading } = formData
    if (isLoading) return <Spinner />

    const renderProps = {
      user: props.user,
      customers: props.customers,
      formData: formData,
      isSaving: isSaving,
      customer: state.customer,
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
    current: state.quotations.get(`current`),
    customers: state.customers.get(`active`),
  }
}

function dispatch2prop(dispatch) {
  return bindActionCreators(
    {
      getOne: quotations.getOne,
      saveOne: quotations.saveOne,
      createInvoice: quotations.createInvoice,
      getAllCustomers: customers.getAll,
    },
    dispatch
  )
}

export default connect(
  state2prop,
  dispatch2prop
)(QuotationForm)
