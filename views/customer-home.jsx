import React              from 'react'
import { connect }        from 'react-redux'
import { Link }           from 'react-router'

import { Empty }          from './_utils.jsx'
import CustomerTable      from './customer-list.jsx'

function mapStateToProp(state) {
  let hasCustomers = state.result && state.result.customers
  hasCustomers     = hasCustomers && state.result.customers.length
  return {
    hasCustomers
  }
}

let CustomerHome = (props) => (
  <div>
    <h1>
      Customers
      <Link to="/customer" className="btn-fab">+</Link>
    </h1>
    {props.hasCustomers ? <CustomerTable /> : <Empty />}
  </div>
)

CustomerHome = connect(mapStateToProp)(CustomerHome)

export { CustomerHome as default }
