import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Floating } from './form.jsx'
import * as customers from '../ducks/customers'

const CreateBtn = () =>  (
  <Link to="/customers/new" className="btn-secondary">New Customer</Link>
)

// https://hackernoon.com/the-constructor-is-dead-long-live-the-constructor-c10871bea599

class CustomerForm extends Component {

  static fetchData(store, params) {
    return store.dispatch( customers.getOne( params ) )
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
      <section>
        <form method="post"onSubmit={this.handleSubmit}>
          <h1>Customer</h1>
          {props.isNew ? null : <input type="hidden" defaultValue={editCopy.id} name="id" />  }
          <fieldset>
            <Floating key="name" name="name" value={editCopy.name} onChange={this.handleChange}/>
            <Floating key="address" name="address" type="textarea" value={editCopy.address} onChange={this.handleChange} />
          </fieldset>
          <div className="actions">
            <button className="btn" type="submit">{props.submitMsg}</button>
            {props.isNew ? null : <CreateBtn />}
          </div>
        </form>
      </section>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { editCopy, current } = state.customers
  const isNew     = editCopy.id == null
  const submitMsg = isNew ? 'Create customer' : 'Update customer'
  const result    = {
    submitMsg:   `${isNew ? 'Create' : 'Update'} customer`,
    isNew,
    current,
    editCopy,
  }
  return result
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getOne:   customers.getOne,
    saveOne:  customers.saveOne,
    editOne:  customers.editOne,
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm)
