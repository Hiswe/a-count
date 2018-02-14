import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Empty } from './_utils.jsx'
import CustomersTable from './customers-list.jsx'
import * as customers from '../ducks/customers'

class CustomerHome extends Component {

  static fetchData(store) {
    return store.dispatch( customers.getAll() )
  }

  componentDidMount() {
    this.props.getAll()
  }

  render() {
    return (
      <div>
        <h1>
          Customers
          <Link to="/customers/new" className="btn-fab">+</Link>
        </h1>
        {this.props.hasCustomers ? <CustomersTable /> : <Empty />}
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
  return bindActionCreators({
    getAll: customers.getAll(),
  }, dispatch)
}

export default connect(mapStateToProp, mapDispatchToProps)(CustomerHome)
