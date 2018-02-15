import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as quotations from '../ducks/quotations'
import * as customers from '../ducks/customers'
import { Floating } from './form.jsx'
// import {Input}                      from './form.jsx';
// import {formatDate, id as formatId} from './_format';
import {
  Amount,
  // getInformationsFromFakeId,
} from './_utils.jsx'
import { PrintBtn, Meta, CustomerField } from './business-form'

// import { Body } from  './business-form-body.jsx'

// <input type="hidden" value={quotation.index.quotation} name="index[quotation]" />
// <input type="hidden" value={quotation.time.created} name="time[created]" />
// {isNew ? null : <input type="hidden" value={quotation._id} name="_id" /> }
// {isNew ? null : <input type="hidden" value={fakeId} name="fakeId" /> }

// const HiddenInputs = (props) => (
//   <div className="hidden-inputs">
//   </div>
// )

let Actions = (props) => {
  let newQuot       = <a key="action-newQuot" href="/quotation" className="btn-fab">+</a>
  let convertRoute  = `/quotation/convert-to-invoice/${props.businessForm.id}`;
  let convert       = <button key="action-convert" className="btn-secondary" formAction={convertRoute} formMethod="post">Convert to invoice</button>;

  return (
    <div className="action">
      <button className="btn" type="submit" name="convertToInvoice" value="false">
        {props.isNew ? 'Create quotation' : 'Update quotation'}
      </button>
      {props.isNew ? null : ['\u00A0', newQuot, '\u00A0', convert]}
    </div>
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
  }

  componentDidMount() {
    const { params } = this.props.match
    this.props.getOne( params )
  }

  componentWillReceiveProps(nextProps) {
    const { history, current } = this.props
    const next = nextProps.current
    // redirect if new customer
    if (!current.id && next.id) {
      history.push(`/customers/${next.id}`)
    }
    // update state on redux status change
    if (current === next)  return
    this.setState( (prevState, props) => {
      const updated = prevState.formData.merge( null, props.current )
      return { formData: updated }
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
    const { value } = target
    const key = target.getAttribute(`name`)
    this.setState( (prevState) => {
      const updated = prevState.formData.set(key, value)
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
          <PrintBtn {...formData} />
        </header>
        <form method="post" className="business-form" >
          <fieldset className="business-form__item business-form__item--meta">
            <CustomerField {...props} {...state} onChange={this.handleChange}/>
            {/* <Status {...props.params} /> */}
          </fieldset>
          <fieldset className="business-form__item business-form__item--tax">
            {/* <Tax {...props.params} /> */}
          </fieldset>
          <fieldset className="business-form__item business-form__item--body">
            <Floating key="name" name="name" value={formData.name} onChange={this.handleChange} />
          </fieldset>
          <div className="business-form__actions">
            <button className="btn" type="submit">{props.submitMsg}</button>
            {/* {props.isNew ? null : ['\u00A0', newQuot, '\u00A0', convert]} */}
          </div>
          {/* {props.isNew ? null : <HiddenInputs /> } */}
          {/* <Body {...props} /> */}
        </form>
      </div>
    )
  }

}

function mapStateToProps(state, ownProps) {
  const { current } = state.quotations
  const isNew = current.id == null
  const result = {
    submitMsg:   `${isNew ? 'Create' : 'Update'} quotation`,
    isNew,
    current,
    customers: state.customers,
  }
  return result
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getOne:   quotations.getOne,
    saveOne:  quotations.saveOne,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuotationForm)
