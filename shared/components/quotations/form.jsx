import React, { Component, Fragment } from 'react'
import crio from 'crio'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import { needRedirect } from '../_helpers.js'
import filterArrayWithObject from '../_filter-array-with-object.js'
import Field from '../ui/field.jsx'
import Knockout from '../layout/knockout.jsx'
import NewProductTable from '../products/table.jsx'
import ProductLine from '../products/line.jsx'
import { Status } from '../business-form'
import Stepper, { Step } from '../ui/stepper.jsx'

import './form.scss'

const ConvertButton = (props) => {
  const convertRoute  = `/quotation/convert-to-invoice/${props.businessForm.id}`
  return (
    <button key="action-convert" className="btn-secondary" formAction={convertRoute} formMethod="post">
      Convert to invoice
    </button>
  )
}

class QuotationForm extends Component {

  constructor( props ) {
    super( props )
    this.state = this.recomputeProducts( this.props.current )
  }

  componentWillReceiveProps( nextProps ) {
    const { history, current } = this.props
    const next = nextProps.current
    // update state on redux status change
    if (current === next) return
    // redirect if new quotation
    if ( needRedirect(current, next) ) history.push(`/quotations/${next.id}`)
    this.setState( (prevState, props) => {
      return this.recomputeProducts( props.current )
    })
  }

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true } )
    console.log({body})
    this.props.saveOne( { params: {body} } )
  }

  recomputeProducts( formData ) {
    // • de-dupe defaultProduct lines
    // • add an empty line a the end
    //   in case a user just type something on the blank one
    // TODO: check if we have the right data
    const defaultProduct  = formData.get( `defaultProduct` )
    const currentProducts = formData.get( `products` )
    const products = filterArrayWithObject({
      defaultObject: defaultProduct,
      array: currentProducts,
    })
      .push( Object.assign({}, defaultProduct) )
    const updated = formData.set( `products`, products )
    return { formData: updated }
  }

  handleChange( event ) {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const key = target.getAttribute(`name`)

    this.setState( (prevState) => {
      const updated = prevState.formData.set(key, value)
      const isProductChange = /^products\[\d+\]/.test(key)
      const isTaxChange = key === 'tax'
      if ( !isProductChange && !isTaxChange ) return { formData: updated }
      return this.recomputeProducts( updated )
    })
  }

  removeProduct(index, prefix) {
    const { formData } = this.state
    const line = formData.get( prefix )

    if ( !line ) return

    this.setState( prevState => {
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

    const Meta = () => (
      <fieldset className="quotation-form__meta">
        { props.isNew ? null : <input type="hidden" defaultValue={formData.id} name="id" /> }
        <Field
          label="customer"
          key="name"
          name="customerId"
          value={formData.customerId}
          type="select"
          options={props.customers}
          onChange={ e => this.handleChange(e) }
        />
        <Stepper name="status">
          <Step label="send at">
          </Step>
          <Step label="validated at">
          </Step>
          <Step label="signed at">
          </Step>
        </Stepper>
        {/* <Status {...props} {...state} onChange={ e => this.handleChange(e) } /> */}
        <Field
          name="tax"
          type="number"
          step="any"
          value={formData.tax}
          onChange={ e => this.handleChange(e) }
        />
      </fieldset>
    )
    return (
      <form method="post" className="quotation-form" onSubmit={ e => this.handleSubmit(e) }>
        <Knockout meta={Meta}>
          <div className="paper-sheet">
            <aside className="sheet__to">
              <h4>{ props.user.name }</h4>
              <div></div>
            </aside>
            <aside className="sheet__from">
              <h4>customer name</h4>
            </aside>
            <Field
              key="name"
              name="name"
              value={formData.name}
              onChange={ e => this.handleChange(e) }
            />
            <NewProductTable products={ products } tax={20} >
              { hasProducts && formData.products.map( (product, index) => {
                const isLast = index === productsLength - 1
                const fieldPath = `products[${ index }]`
                return (
                  <ProductLine
                    key={ index }
                    fieldPath={ fieldPath }
                    product={ product }
                    onChange={ e => this.handleChange(e) }>
                    { !isLast && <button onClick={ e => this.removeProduct(index, fieldPath) } type="button">remove</button> }
                  </ProductLine>
                )
              }) }
            </NewProductTable>
          </div>
          <div className="quotation-form__actions">
            <button className="btn" type="submit">{props.submitMsg}</button>
            {/* TODO: add the convert button if all steps are set */}
            {/* <ConvertButton /> */}
          </div>
        </Knockout>
      </form>
    )
  }
}

const state2prop = state => {
  const { current } = state.quotations
  const isNew = current.id == null
  const result = {
    submitMsg: `${isNew ? 'Create' : 'Update'} quotation`,
    isNew,
    current,
    customers: state.customers && state.customers.list,
    user: state.users.current
  }
  return result
}

const dispatch2prop = dispatch => {
  return bindActionCreators({
    getOne: quotations.getOne,
    saveOne: quotations.saveOne,
    getAllCustomers: customers.getAll,
  }, dispatch)
}

export default connect( state2prop, dispatch2prop )( QuotationForm )
