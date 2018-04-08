import React        from 'react'
import { Link }     from 'react-router-dom'
import { connect }  from 'react-redux'

import { Table, EmptyLine } from '../ui/table.jsx'
import { FormatNumber, Amount } from '../ui/format.jsx'
import { Progress } from '../ui/progress.jsx'

function CustomerRow( props ) {
  const { customer, currency } = props
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
        <Amount value={customer.quotationsTotal} currency={ currency }/>
      </td>
      <td className="is-number">
        <FormatNumber value={customer.invoicesCount} />
      </td>
      <td className="is-number">
        <Amount value={customer.get(`invoicesTotal`)} currency={ currency } />
      </td>
      <td className="is-progress">
        <Progress
          tableLayout
          value={ customer.get(`invoicesTotalLeft`) }
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
      columns={[
        {label: `table.header.name`},
        {
          label: `table.header.quotations`,
          style:{ width: `18em`},
        },
        {
          label: `table.header.cumulative-amount`,
          style:{ width: `18em`},
        },
        {
          label: `table.header.invoices`,
          style:{ width: `18em`}
        },
        {
          label: `table.header.cumulative-amount`,
          style:{ width: `18em`},
        }, {
          label: `table.amount.paid`,
        },
      ]}
      className="table--pres"
    >
      {
        !hasCustomer ? ( <EmptyLine colspan="3" /> )
        : props.customers.map( (customer, i) => (
          <CustomerRow key={customer.id} customer={customer} currency={currency} />
        ))
      }
    </Table>
  )
}

function state2prop( state ) {
  return {
    customers: state.customers.get(`list`),
    currency: state.account.get(`current.currency`),
  }
}

export default connect( state2prop )( CustomerList )
