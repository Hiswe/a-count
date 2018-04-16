import React        from 'react'
import { Link }     from 'react-router-dom'
import { connect }  from 'react-redux'

import { Table, EmptyLine } from '../ui/table.jsx'
import { FormatNumber, Amount } from '../ui/format.jsx'
import { Progress } from '../ui/progress.jsx'

function CustomerRow( props ) {
  const { customer } = props
  const url      = `/customers/${customer.id}`
  return (
    <tr>
      <td>
        <Link to={ url }>{ customer.name }</Link>
      </td>
      <td className="is-number">
        <FormatNumber value={customer.quotationsCount} />
      </td>
      <td className="is-number">
        <Amount value={customer.quotationsTotal} />
      </td>
      <td className="is-number">
        <FormatNumber value={customer.invoicesCount} />
      </td>
      <td className="is-number">
        <Amount value={customer.get(`invoicesTotal`)} />
      </td>
      <td className="is-progress">
        <Progress
          tableLayout
          value={ customer.get(`invoicesTotalPaid`) }
          max={ customer.get(`invoicesTotal`) }
        />
      </td>
    </tr>
  )
}

function CustomerList( props ) {
  const { customers, currency } = props
  const hasCustomer = Array.isArray( customers ) && customers.length
  return (
    <Table
      presentation
      columns={[
        {
          label: `table.header.name`,
        },
        {
          label: `table.header.quotations`,
        },
        {
          label: `table.header.cumulative-amount`,
          style:{ width: `18em`},
        },
        {
          label: `table.header.invoices`,
        },
        {
          label: `table.header.cumulative-amount`,
          style:{ width: `18em`},
        }, {
          label: `table.amount.paid`,
        },
      ]}
    >
      {
        !hasCustomer ? ( <EmptyLine colSpan="6" /> )
        : props.customers.map( (customer, i) => (
          <CustomerRow key={customer.id} customer={customer} />
        ))
      }
    </Table>
  )
}

function state2prop( state ) {
  return {
    customers: state.customers.get(`list`),
  }
}

export default connect( state2prop )( CustomerList )
