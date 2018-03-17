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
import PaperSheet, { From, To } from '../layout/paper-sheet.jsx'
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
    this.state = this.recomputeFormData( this.props.current )
  }

  componentWillReceiveProps( nextProps ) {
    const { history, current } = this.props
    const next = nextProps.current
    // update state on redux status change
    if (current === next) return
    // redirect if new quotation
    if ( needRedirect(current, next) ) history.push( `/quotations/${next.id}` )
    this.setState( (prevState, props) => {
      return this.recomputeFormData( props.current )
    })
  }

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true, empty: true } )
    this.props.saveOne( { params: {body} } )
  }

  static getSteps() {
    return [
      { key: `sendAt`,       label: `send` },
      { key: `validatedAt`,  label: `validated` },
      { key: `signedAt`,     label: `signed` },
    ]
  }

  recomputeSteps( formData ) {
    const steps = QuotationForm.getSteps().map( s => {
      const value = formData.get( s.key )
      return {
        key: s.key,
        label: s.label,
        value,
      }
    })
    return formData.set( `steps`, steps )
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
    return updated
  }

  recomputeFormData( formData ) {
    const withSteps = this.recomputeSteps( formData )
    const withCleanProducts = this.recomputeProducts( withSteps )
    return {
      formData: withCleanProducts,
    }
  }

  handleChange( event ) {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const key = target.getAttribute( `name` )

    this.setState( prevState => {
      const updated = prevState.formData.set( key, value )
      const isProductChange = /^products\[\d+\]/.test(key)
      const isTaxChange = key === 'tax'
      const withSteps = this.recomputeSteps( updated )
      if ( !isProductChange && !isTaxChange ) return { formData: withSteps }
      return { formData: this.recomputeProducts( withSteps ) }
    })
  }

  removeProduct( index, prefix ) {
    const { formData } = this.state
    const line = formData.get( prefix )

    if ( !line ) return

    this.setState( prevState => {
      const updatedProducts = prevState.formData.products.splice( index, 1 )
      const updated = prevState.formData.set( `products`, updatedProducts )
      return { formData: this.recomputeProducts( updated ) }
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
      <div className="quotation-form__meta">
        <Stepper
          steps={ formData.steps }
          onChange={ e => this.handleChange(e) }
        />
        <Field darkBg floatingLabel
          label="customer"
          name="customerId"
          value={ formData.customerId }
          type="select"
          options={ props.customers }
          onChange={ e => this.handleChange(e) }
        />
        <Field darkBg floatingLabel
          name="tax"
          type="number"
          step="any"
          value={ formData.tax }
          onChange={ e => this.handleChange(e) }
        />
      </div>
    )
    return (
      <form
        method="post"
        className="quotation-form"
        onSubmit={ e => this.handleSubmit(e) }
      >
        { props.isNew ? null : <input type="hidden" defaultValue={formData.id} name="id" /> }
        <Knockout meta={ Meta }>
          <PaperSheet>
            <From {...props.user} />
            <To name="customer name" />
            <Field floatingLabel
              name="name"
              value={ formData.name }
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
          </PaperSheet>
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

// TODO: move markup to a presentational Component

function state2prop( state ) {
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

function dispatch2prop( dispatch ) {
  return bindActionCreators({
    getOne: quotations.getOne,
    saveOne: quotations.saveOne,
    getAllCustomers: customers.getAll,
  }, dispatch)
}

export default connect( state2prop, dispatch2prop )( QuotationForm )
