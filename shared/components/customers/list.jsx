import React        from 'react'
import { Link }     from 'react-router-dom'
import { connect }  from 'react-redux'

import { Table, EmptyLine } from '../ui/table.jsx'

function CustomerRow( props ) {
  const customer = props.customer
  const url      = `/customers/${customer.id}`
  return (
    <tr>
      <td>
        <Link to={ url }>{ customer.name }</Link>
      </td>
      <td>{ customer.quotationsCount }</td>
      <td>{ customer.invoicesCount }</td>
    </tr>
  )
}

function CustomerList( props ) {
  const { customers } = props
  const hasCustomer = Array.isArray( customers ) && customers.length
  return (
    <Table
      columns={[
        {label: `table.header.name`},
        {label: `table.header.quotation-count`},
        {label: `table.header.invoice-count`},
      ]}
      className="table--pres"
    >
      {
        !hasCustomer ? ( <EmptyLine colspan="3" /> )
        : props.customers.map( (customer, i) => (
          <CustomerRow key={customer.id} customer={customer} />
        ))
      }
    </Table>
  )
}

function state2prop( state ) {
  return {
    customers: state.customers && state.customers.list
  }
}

export default connect( state2prop )( CustomerList )
