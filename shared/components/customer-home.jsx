import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Empty } from './_utils.jsx'
import CustomerTable from './customer-list.jsx'
import { fetchCustomers } from '../ducks/customers'

class CustomerHome extends Component {

  static fetchData(store) {
    return store.dispatch( fetchCustomers() )
  }

  componentDidMount() {
    this.props.fetchCustomers();
  }

  render() {
    return (
      <div>
        <h1>
          Customers
          <Link to="/customers/new" className="btn-fab">+</Link>
        </h1>
        {this.props.hasCustomers ? <CustomerTable /> : <Empty />}
      </div>
    )
  }
}

const mapStateToProp = (state) => {
  const customers = state.customers && state.customers.list
  const hasCustomers = customers && customers.length
  return {
    hasCustomers,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchCustomers }, dispatch)
}

export default connect(mapStateToProp, mapDispatchToProps)(CustomerHome)
