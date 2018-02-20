import React, { Component } from 'react'
import isUndefined from 'lodash/isundefined'
import { diff } from 'deep-object-diff'
import crio from 'crio'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import round from 'lodash/round'

import * as quotations from '../ducks/quotations'
import * as customers from '../ducks/customers'
import { Floating, Input } from './form.jsx'
import { Amount } from './_utils.jsx'
import { PrintBtn, Status, CustomerField, ProductTable } from './business-form'

const ConvertButton = (props) => {
  const convertRoute  = `/quotation/convert-to-invoice/${props.businessForm.id}`
  return (
    <button key="action-convert" className="btn-secondary" formAction={convertRoute} formMethod="post">
      Convert to invoice
    </button>
  )
}

class QuotationForm extends Component {

  static fetchData(store, params) {
    return Promise.all([
      store.dispatch( quotations.getOne( params ) ),
      store.dispatch( customers.getAll() ),
    ])
  }

  constructor(props) {
    super(props)
    this.state = {
      formData: this.props.current,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this)
  }

  componentDidMount() {
    const { params } = this.props.match
    this.props.getOne( params )
    this.props.getAllCustomers( params )
  }

  componentWillReceiveProps(nextProps) {
    const { history, current } = this.props
    const next = nextProps.current
    // redirect if new customer
    if (!current.id && next.id) {
      history.push(`/customers/${next.id}`)
    }
    if (current === next) return
    this.setState( (prevState, props) => {
      return { formData: props.current }
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const result = {}
    for (const [key, value] of formData.entries()) {
      result[key] = value
    }
    this.props.saveOne( result )
  }

  handleChange(event) {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const key = target.getAttribute(`name`)

    this.setState( (prevState) => {
      let updated = prevState.formData.set(key, value)
      // add an empty line in case a user just type something on the blank one
      const defaultProduct  = prevState.formData.get( `defaultProduct` )
      const products        = updated.get( `products` )
      const lastProduct     = products.get( products.length -1 )
      const isNewProductLine = Object.keys( lastProduct )
        .map( key => lastProduct[ key ] === defaultProduct[ key ] )
        .reduce( (acc, curr) => { return acc === true && curr === true}, true )
      updated = isNewProductLine ? updated
        : updated.set( `products[${products.length}]`, defaultProduct )
      // recompute totals
      const totalNet  = round( updated.get(`products`)
        .reduce( (acc, val)  => acc + val.quantity * val.price, 0), 2)
      const totalTax  = round(totalNet * updated.get(`tax`) / 100, 2)
      const total     = totalNet + totalTax
      updated = updated.merge(null, {totalNet, totalTax, total})
      return { formData: updated }
    })
  }

  handleRemoveProduct(index, value) {
    const { formData } = this.state
    const line = formData.get(value)
    if (!line) return
    this.setState( (prevState) => {
      const updatedProducts = prevState.formData.products.splice(index, 1)
      const updated = prevState.formData.set(`products`, updatedProducts)
      return { formData: updated }
    })
  }

  render() {
    const { props, state } = this
    const { formData } = state
    return (
      <div>
        <header>
          <h1>
            {'Quotation\u00A0'}
          </h1>
          {/* deactivated for now */}
          {/* TODO render a new webpage when clicked */}
          {/* <PrintBtn {...formData} /> */}
        </header>
        <form method="post" className="business-form" >
          <fieldset className="business-form__item business-form__item--meta">
            <CustomerField {...props} {...state} onChange={this.handleChange} />
            <Status {...props} {...state} onChange={this.handleChange} />
          </fieldset>
          <fieldset className="business-form__item business-form__item--tax">
            <Input name="tax" type="number" step="any" value={formData.tax} onChange={this.handleChange} />
          </fieldset>
          <fieldset className="business-form__item business-form__item--body">
            <Input key="name" name="name" value={formData.name} onChange={this.handleChange} />
            <ProductTable {...state} onChange={this.handleChange} handleRemoveProduct={this.handleRemoveProduct} />
          </fieldset>
          <div className="business-form__actions">
            <button className="btn" type="submit">{props.submitMsg}</button>
            {/* TODO add the convert button if all steps are set */}
            {/* <ConvertButton /> */}
            {props.isNew ? null : <Link to="/quotations/new" className="btn-secondary">New Quotation</Link>}
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { current } = state.quotations
  const isNew = current.id == null
  const result = {
    submitMsg: `${isNew ? 'Create' : 'Update'} quotation`,
    isNew,
    current,
    customers: state.customers,
  }
  return result
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getOne: quotations.getOne,
    saveOne: quotations.saveOne,
    getAllCustomers: customers.getAll,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuotationForm)
