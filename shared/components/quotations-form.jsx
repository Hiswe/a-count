import React, { Component } from 'react'
import crio from 'crio'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import round from 'lodash/round'

import * as quotations from '../ducks/quotations'
import * as customers from '../ducks/customers'
import { needRedirect, filterObjectInArrayWith, computeTotals } from './_helpers.js'

import { Floating, Input } from './form.jsx'
import { Amount, RenderError } from './_utils.jsx'
import { PrintBtn, Status, ProductTable } from './business-form'

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

    // update state on redux status change
    if (current === next) return

    // redirect if new quotation
    if ( needRedirect(current, next) ) history.push(`/quotations/${next.id}`)

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

  recomputeTotals(formData) {
    // - de-dupe defaultProduct lines
    // - add an empty line a the end
    //   in case a user just type something on the blank one
    const defaultProduct  = formData.get( `defaultProduct` )
    const defaultKeys = Object.keys( defaultProduct )
    const currentProducts = formData.get(`products`)
    const products = filterObjectInArrayWith( defaultProduct, currentProducts )
      .push( Object.assign({}, defaultProduct) )
    let updated = formData.set( `products`, products )
    // recompute totals
    const totals = computeTotals( updated.get(`products`), updated.get(`tax`) )
    updated = updated.merge(null, totals)
    return { formData: updated }
  }

  handleChange(event) {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const key = target.getAttribute(`name`)

    this.setState( (prevState) => {
      let updated = prevState.formData.set(key, value)
      const isProductChange = /^products\[\d+\]/.test(key)
      const isTaxChange = key === 'tax'
      if ( !isProductChange && !isTaxChange ) return { formData: updated }
      return this.recomputeTotals( updated )
    })
  }

  handleRemoveProduct(index, value) {
    const { formData } = this.state
    const line = formData.get(value)

    if (!line) return

    this.setState( (prevState) => {
      const updatedProducts = prevState.formData.products.splice(index, 1)
      const updated = prevState.formData.set(`products`, updatedProducts)
      return this.recomputeTotals( updated )
    })
  }

  render() {
    const { props, state } = this
    const { current } = props
    const { formData } = state

    if ( current.error ) return ( <RenderError {...current} /> )

    return (
      <div>
        <header>
          <h1>
            {'Quotation\u00A0'}
            {formData.count && '-\u00A0'}
            {formData.count && (<span>PR { formData.count+350 }</span>)}
          </h1>
          {/* deactivated for now */}
          {/* TODO render a new webpage when clicked */}
          {/* <PrintBtn {...formData} /> */}
        </header>
        <form method="post" className="business-form" >
          <fieldset className="business-form__item business-form__item--meta">
            {/* <CustomerField {...props} {...state} onChange={this.handleChange} /> */}
            <Input label="customer" key="name" name="customerId" type="select"
                    value={formData.customerId} entries={props.customers}
                    onChange={this.handleChange}
            />
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
    customers: state.customers && state.customers.list,
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
