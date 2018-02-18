import React        from 'react'
import { Link }     from 'react-router-dom'
import { connect }  from 'react-redux'

import { safeMarked }    from './_format'

const CustomerRow = (props) => {
  let customer = props.customer
  let url      = `/customers/${customer.id}`
  let address  = { __html: safeMarked(customer.address) }
  return (
    <tr>
      <td>
        <Link to={url}>{customer.name}</Link>
      </td>
      <td dangerouslySetInnerHTML={address} />
    </tr>
  )
}

const CustomerList = (props) => {
  let body = props.customers.map( (customer, i) => (
    <CustomerRow key={customer.id} customer={customer} />
  ))
  return (
    <table className="table-pres" cellSpacing="0">
      <thead>
        <tr>
          <th>name</th>
          <th>address</th>
        </tr>
      </thead>
      <tbody>
        {body}
      </tbody>
    </table>
  )
}

function mapStateToProp(state) {
  return {
    customers: state.customers && state.customers.list
  }
}

export default connect(mapStateToProp)(CustomerList)
