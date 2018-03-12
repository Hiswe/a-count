import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as customers from '../../ducks/customers'
import { needRedirect } from '../_helpers.js'
import Field from '../ui/field.jsx'
import ProductTable from '../products/table.jsx'
import ProductLine from '../products/line.jsx'
// import { RenderError } from '../_utils.jsx'

class UserForm extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      formData: this.props.current,
    }
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    // const { params } = this.props.match
    // this.props.getOne( params )
  }

  componentWillReceiveProps(nextProps) {
    // const { history, current } = this.props
    // const next = nextProps.current

    // // update state on redux status change
    // if (current === next) return

    // // redirect if new customer
    // if ( needRedirect(current, next) ) history.push(`/customers/${next.id}`)

    // this.setState( (prevState, props) => {
    //   const updated = prevState.formData.merge( null, props.current )
    //   return { formData: updated }
    // })
  }

  handleSubmit( event ) {
    // event.preventDefault()
    // const result = serialize( event.target, { hash: true, empty: true } )
    // this.props.saveOne( result )
  }

  handleChange( event ) {
    const { target } = event
    const { value } = target
    const key = target.getAttribute(`name`)
    this.setState( prevState => {
      const updated = prevState.formData.set(key, value)
      return { formData: updated }
    })
  }

  render() {
    const { props, state } = this
    const { current } = props
    const { formData } = state
    const { defaultProduct, defaultQuotation, defaultInvoice } = formData

    // if ( current.error ) return ( <RenderError {...current} /> )

    return (
      <form
        method="post"
        action={`/users/${formData.id}`}
        onSubmit={this.handleSubmit}
        className="form form--profile"
      >
        <input type="hidden" name="id" defaultValue={formData.id} />
        <fieldset className="card" style={{gridColumn: `1 / span 2`}}>
          <h3 className="card__title">General Information</h3>
          <div className="card__content">
            <Field key="name" name="name" value={ formData.name } onChange={ e => this.handleChange(e) } />
          </div>
        </fieldset>
        <fieldset className="card" style={{gridColumn: `1 / span 2`}}>
          <h3 className="card__title">Default Product</h3>
          <div className="card__content">
            <input type="hidden" name="defaultProduct[id]" defaultValue={defaultProduct.id} />
            <ProductTable>
              <ProductLine
                fieldPath="defaultProduct"
                onChange={ e => this.handleChange(e) }
                product={ defaultProduct }
                currency={ defaultQuotation.currency }
              />
            </ProductTable>
          </div>
        </fieldset>
        <fieldset className="card">
          <h3 className="card__title">Default Quotation</h3>
          <div className="card__content">
            <input type="hidden" name="defaultQuotation[id]" defaultValue={defaultQuotation.id} />
            <Field
              key="defaultQuotation[tax]"
              name="defaultQuotation[tax]"
              label="tax"
              value={ defaultQuotation.tax }
              onChange={ e => this.handleChange(e) }
            />
            <Field
              key="defaultQuotation[prefix]"
              name="defaultQuotation[prefix]"
              label="prefix"
              value={ defaultQuotation.prefix }
              onChange={ e => this.handleChange(e) }
            />
            <Field
              key="defaultQuotation[startAt]"
              name="defaultQuotation[startAt]"
              label="start at"
              value={ defaultQuotation.startAt }
              onChange={ e => this.handleChange(e) }
              type="number"
              min="0"
              step="1"
            />
            <Field
              key="defaultQuotation[mentions]"
              name="defaultQuotation[mentions]"
              label="mentions"
              value={ defaultQuotation.mentions }
              onChange={ e => this.handleChange(e) }
              type="textarea"
            />
          </div>
        </fieldset>
        <fieldset className="card">
          <h3 className="card__title">Default Invoice</h3>
          <div className="card__content">
            <input type="hidden" name="defaultInvoice[id]" defaultValue={defaultInvoice.id} />
            <Field
              key="defaultInvoice[prefix]"
              name="defaultInvoice[prefix]"
              label="prefix"
              value={ defaultInvoice.prefix }
              onChange={ e => this.handleChange(e) }
            />
            <Field
              key="defaultInvoice[startAt]"
              name="defaultInvoice[startAt]"
              label="start at"
              value={ defaultInvoice.startAt }
              onChange={ e => this.handleChange(e) }
              type="number"
              min="0"
              step="1"
            />
            <Field
              key="defaultInvoice[mentions]"
              name="defaultInvoice[mentions]"
              label="mentions"
              value={ defaultInvoice.mentions }
              onChange={ e => this.handleChange(e) }
              type="textarea"
            />
          </div>
        </fieldset>
        <div className="actions" style={{gridColumn: `1 / span 2`}}>
          <button className="btn" type="submit">save update</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    current: state.user.current,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    // getOne:   customers.getOne,
    // saveOne:  customers.saveOne,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)( UserForm )
