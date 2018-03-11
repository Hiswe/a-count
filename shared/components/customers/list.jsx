import React        from 'react'
import { Link }     from 'react-router-dom'
import { connect }  from 'react-redux'

import { safeMarked } from '../_helpers'
import Table from '../ui/table.jsx'
import TableEmptyLine from '../ui/table-empty-line.jsx'

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
    <Table columns="name, address, numbers of quotations" className="table--pres">
      {
        !hasCustomer ? ( <TableEmptyLine colspan="3" /> )
        : props.customers.map( (customer, i) => (
          <CustomerRow key={customer.id} customer={customer} />
        ))
      }
    </Table>
  )
}

function mapStateToProp(state) {
  return {
    customers: state.customers && state.customers.list
  }
}

export default connect(mapStateToProp)(CustomerList)
