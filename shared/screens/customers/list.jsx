import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Empty } from '../../components/_utils.jsx'
import CustomersTable from '../../components/customers-list.jsx'
import * as customers from '../../ducks/customers'
import FullPage from '../../components/layout/full-page.jsx'

class CustomerHome extends Component {

  static fetchData(store, params, cookies) {
    return store.dispatch( customers.getAll(params, cookies) )
  }

  componentDidMount() {
    this.props.getAll()
  }

  render() {
    return (
      <FullPage title="Customers">
        <Link to="/customers/new" className="btn-fab">+</Link>
        {this.props.hasCustomers ? <CustomersTable /> : <Empty />}
      </FullPage>
    )
  }
}

const mapStateToProp = (state) => {
  const customers   = state.customers && state.customers.list
  const hasCustomers = customers && customers.length
  return {
    hasCustomers,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAll: customers.getAll,
  }, dispatch)
}

export default connect(mapStateToProp, mapDispatchToProps)(CustomerHome)
