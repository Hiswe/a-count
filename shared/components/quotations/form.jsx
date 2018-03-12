import React, { Component } from 'react'
import crio from 'crio'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import { needRedirect, filterObjectInArrayWith, computeTotals } from '../_helpers.js'

import { Amount, RenderError } from '../_utils.jsx'
import Field from '../ui/field.jsx'
import NewProductTable from '../products/table.jsx'
import ProductLine from '../products/line.jsx'
import { PrintBtn, Status } from '../business-form'

const ConvertButton = (props) => {
  const convertRoute  = `/quotation/convert-to-invoice/${props.businessForm.id}`
  return (
    <button key="action-convert" className="btn-secondary" formAction={convertRoute} formMethod="post">
      Convert to invoice
    </button>
  )
}

class QuotationForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      formData: this.props.current,
    }
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

  handleSubmit( event ) {
    event.preventDefault()
    const result = serialize( event.target, { hash: true } )
    this.props.saveOne( {result} )
  }

  recomputeProducts( formData ) {
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
      return this.recomputeProducts( updated )
    })
  }

  handleRemoveProduct(index, value) {
    const { formData } = this.state
    const line = formData.get(value)

    if (!line) return

    this.setState( (prevState) => {
      const updatedProducts = prevState.formData.products.splice(index, 1)
      const updated = prevState.formData.set(`products`, updatedProducts)
      return this.recomputeProducts( updated )
    })
  }

  render() {
    const { props, state } = this
    const { current } = props
    const { formData } = state
    const { products } = formData
    const hasProducts = Array.isArray( products )
    const productsLength = hasProducts ? products.length : 0

    return (
      <div>
        <header>
          <h1>
            {'Quotation\u00A0'}
            {formData.count && '-\u00A0'}
            {formData.count && (<span>PR { formData.count+350 }</span>)}
          </h1>
          {/* deactivated for now */}
          {/* TODO: render a new webpage when clicked */}
          {/* <PrintBtn {...formData} /> */}
        </header>
        <form method="post" className="business-form" onSubmit={ e => this.handleSubmit(e) }>
          <fieldset className="business-form__item business-form__item--meta">
            { props.isNew ? null : <input type="hidden" defaultValue={formData.id} name="id" /> }
            <Field label="customer" key="name" name="customerId" type="select"
                    value={formData.customerId} entries={props.customers}
                    onChange={this.handleChange}
            />
            <Status {...props} {...state} onChange={this.handleChange} />
          </fieldset>
          <fieldset className="business-form__item business-form__item--tax">
            <Field name="tax" type="number" step="any" value={formData.tax} onChange={this.handleChange} />
          </fieldset>
          <fieldset className="business-form__item business-form__item--body">
            <Field key="name" name="name" value={formData.name} onChange={this.handleChange} />
            <NewProductTable products={ products } tax={20} >
              { hasProducts && formData.products.map( (p, i) => {
                const isLast = i === productsLength -1
                return (
                  <ProductLine
                    key={i}
                    prefix={`products[${i}]`}
                    product={p}
                    onChange={ e => this.handleChange(e) }>
                    { !isLast && <button onClick={() => false} type="button" value={i}>remove</button> }
                  </ProductLine>
                )
              }) }
            </NewProductTable>
          </fieldset>
          <div className="business-form__actions">
            <button className="btn" type="submit">{props.submitMsg}</button>
            {/* TODO: add the convert button if all steps are set */}
            {/* <ConvertButton /> */}
            {props.isNew ? null : <Link to="/quotations/new" className="btn-secondary">New Quotation</Link>}
          </div>
        </form>
      </div>
    )
  }
}

{/* <ProductLine
  prefix="defaultProduct"
  handleChange={ (e) => this.handleChange(e) }
  product={ defaultProduct }
  currency={ defaultQuotation.currency }
/> */}

function mapStateToProps(state, ownProps) {
  const { current } = state.quotations
  const isNew = current.id == null
  const result = {
    submitMsg: `${isNew ? 'Create' : 'Update'} quotation`,
    isNew,
    current,
    customers: state.customers && state.customers.list,
    user: state.user.current
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
