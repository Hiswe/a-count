import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Floating } from './form.jsx'
import * as customers from '../ducks/customers'

const CreateBtn = () =>  (
  <Link to="/customers/new" className="btn-secondary">New Customer</Link>
)

class CustomerForm extends Component {

  static fetchData(store, params) {
    return store.dispatch( customers.fetchOne( params ) )
  }

  constructor(props) {
    super(props)
    this.state = Object.assign( {}, this.props.customer )
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { params } = this.props.match
    this.props.getOne( params )
  }

  componentWillReceiveProps(nextProps) {
    const { history }     = this.props
    const currentCustomer = this.props.customer
    const nextCustomer    = nextProps.customer
    // redirect if new customer
    if (!currentCustomer.id && nextCustomer.id) {
      history.push(`/customers/${nextCustomer.id}`)
    }
    // update state on redux status change
    if (currentCustomer !== nextCustomer) {
      this.setState( nextProps.customer )
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
    const modification  = {
      [ target.getAttribute('name') ]: target.value,
    }
    this.setState( modification )
  }

  render() {
    const { props, state } = this
    return (
      <section>
        <form method="post"onSubmit={this.handleSubmit}>
          <h1>Customer</h1>
          {props.isNew ? null : <input type="hidden" defaultValue={state.id} name="id" />  }
          <fieldset>
            <Floating key="name" name="name" value={state.name} onChange={this.handleChange}/>
            <Floating key="address" name="address" type="textarea" value={state.address} onChange={this.handleChange} />
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
  const customer  = state.customers && state.customers.current
  const isNew     = customer.id == null
  const submitMsg = isNew ? 'Create customer' : 'Update customer'
  const result    = {
    submitMsg:   `${isNew ? 'Create' : 'Update'} customer`,
    isNew,
    customer,
  }
  return result
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchOne: customers.fetchOne,
    saveOne:  customers.saveOne,
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm)
