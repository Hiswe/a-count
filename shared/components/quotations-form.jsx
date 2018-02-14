import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as quotations from '../ducks/quotations'
import * as customers from '../ducks/customers'
// import {Input}                      from './form.jsx';
// import {formatDate, id as formatId} from './_format';
import {
  Amount,
  // getInformationsFromFakeId,
} from './_utils.jsx'
import {
  PrintBtn,
//   Meta,
} from './business-form'

// import { Body } from  './business-form-body.jsx'

// ////////
// // WHOLE PAGE
// ////////

// let Actions = (props) => {
//   let newQuot       = <a key="action-newQuot" href="/quotation" className="btn-fab">+</a>
//   let convertRoute  = `/quotation/convert-to-invoice/${props.businessForm.id}`;
//   let convert       = <button key="action-convert" className="btn-secondary" formAction={convertRoute} formMethod="post">Convert to invoice</button>;

//   return (
//     <div className="action">
//       <button className="btn" type="submit" name="convertToInvoice" value="false">
//         {props.isNew ? 'Create quotation' : 'Update quotation'}
//       </button>
//       {props.isNew ? null : ['\u00A0', newQuot, '\u00A0', convert]}
//     </div>
//   )
// }

// function mapActions(state, ownProps) {
//   let infos = getInformationsFromFakeId(state, ownProps)
//   return infos
// }

// Actions = connect(mapActions)(Actions)

// <input type="hidden" value={quotation.index.quotation} name="index[quotation]" />
// <input type="hidden" value={quotation.time.created} name="time[created]" />
// {isNew ? null : <input type="hidden" value={quotation._id} name="_id" /> }
// {isNew ? null : <input type="hidden" value={fakeId} name="fakeId" /> }

// const HiddenInputs = (props) => (
//   <div className="hidden-inputs">
//   </div>
// )

// let QuotationForm = (props) => (
//   <div>
//     <header>
//       <h1>
//         {'Quotation\u00A0'}
//       </h1>
//     </header>
//     <form method="post">
//       {/* {props.isNew ? null : <HiddenInputs /> }
//       <Meta {...props} />
//       <Body {...props} />
//       <Actions {...props.params} /> */}
//     </form>
//   </div>
// )

class QuotationForm extends Component {

  static fetchData(store, params) {
    return Promise.all([
      store.dispatch( quotations.getOne( params ) ),
      store.dispatch( customers.getAll() ),
    ])
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { params } = this.props.match
    this.props.getOne( params )
  }

  componentWillReceiveProps(nextProps) {
    const { history, editCopy, current } = this.props
    // redirect if new customer
    if (!editCopy.id && current.id) {
      history.push(`/customers/${current.id}`)
    }
    // update state on redux status change
    if (editCopy !== current) {
      // this.setState( nextProps.customer )
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const result    = {}
    for (const [key, value] of formData.entries()) {
      result[key] = value
    }
    this.props.saveOne( result )
  }

  handleChange(event) {
    const { target }    = event
    const { props: { editOne} } = this
    const modification  = {
      [ target.getAttribute('name') ]: target.value,
    }
    editOne( modification )
  }

  render() {
    const { props } = this
    const { editCopy } = props
    return (
      <div>
        <header>
          <h1>
            {'Quotation\u00A0'}
            <PrintBtn {...props} />
          </h1>
        </header>
        <form method="post">
          {/* {props.isNew ? null : <HiddenInputs /> }
          <Meta {...props} />
          <Body {...props} />
          <Actions {...props.params} /> */}
        </form>
      </div>
    )
  }

}

function mapStateToProps(state, ownProps) {
  const { editCopy, current } = state.quotations
  const isNew = editCopy.id == null
  const result = {
    submitMsg:   `${isNew ? 'Create' : 'Update'} quotation`,
    isNew,
    current,
    editCopy,
    customers: state.customers,
  }
  return result
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getOne:   quotations.getOne,
    saveOne:  quotations.saveOne,
    editOne:  quotations.editOne,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuotationForm)
