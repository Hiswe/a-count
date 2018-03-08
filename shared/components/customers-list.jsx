import React        from 'react'
import { Link }     from 'react-router-dom'
import { connect }  from 'react-redux'

import { safeMarked }    from './_helpers'

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
      <td>{ customer.quotationsCount }</td>
    </tr>
  )
}

const CustomerList = (props) => {
  const { customers } = props
  const hasCustomer = Array.isArray( customers ) && customers.length
  return (
    <table className="table-pres" cellSpacing="0">
      <thead>
        <tr>
          <th>name</th>
          <th>address</th>
          <th>numbers of quotations</th>
        </tr>
      </thead>
      <tbody>
        {
          !hasQuhasCustomerotations ? ( <Empty colspan="3" /> )
          : props.quotations.map( (customer, i) => (
            <CustomerRow key={q.id} customer={customer} />
          ))
        }
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
