import React from 'react'
import { Link }     from 'react-router-dom'
import { connect }  from 'react-redux'

import { Table, EmptyLine } from '../ui/table.jsx'
import { Amount, Date } from '../ui/format.jsx'

function InvoiceRow( props ) {
  const { invoice, currency } = props
  const url = `/invoices/${invoice.id}`
  return (
    <tr>
      <td>
        <Link to={ url }>{ invoice.get( `reference` ) }</Link>
      </td>
      <td>
        <Link to={ url }>{ invoice.get( `name` ) }</Link>
      </td>
      <td>
        <Link to={`/customers/${invoice.customerId}`}>
          {invoice.get( `customer.name` )}
        </Link>
      </td>
      <td>
        <Link to={`/quotations/${invoice.get('quotation.id')}`}>
          {invoice.get(`quotation.reference`)}
        </Link>
      </td>
      <td className="is-number">
        <Amount
          value={invoice._total.all}
          currency={ currency }
        />
      </td>
    </tr>
  )
}

function InvoiceList( props ) {
  const { invoices } = props
  const hasInvoices = Array.isArray( invoices ) && invoices.length
  return (
    <Table
      columns={[
        {label: `table.header.id`},
        {label: `table.header.name`},
        {label: `table.header.customer`},
        {label: `table.header.quotation`},
        {label: `table.amount`},
      ]}
      className="table--pres"
    >
      {
        !hasInvoices ? ( <EmptyLine colspan="3" /> )
        : invoices.map( (invoice, i) => (
          <InvoiceRow
            key={ invoice.id }
            invoice={ invoice }
            currency={ props.currency }
          />
        ))
      }
    </Table>
  )
}

function state2prop( state ) {
  return {
    invoices: state.invoices.get( `list` ),
    currency: state.account.get( `current.currency` ),
  }
}

export default connect( state2prop )( InvoiceList )
