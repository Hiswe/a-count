import React from 'react'
import { Link }     from 'react-router-dom'
import { connect }  from 'react-redux'

import { Table, EmptyLine } from '../ui/table.jsx'
import { Amount, Date } from '../ui/format.jsx'
import { Progress } from '../ui/progress.jsx'

function InvoiceRow( props ) {
  const { invoice } = props
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
          value={invoice.get(`total`)}
        />
      </td>
      <td className="is-progress">
        <Progress
          tableLayout
          value={ invoice.get(`totalPaid`) }
          max={ invoice.get(`total`) }
        />
      </td>
    </tr>
  )
}

const columns = [
  {label: `table.header.id`},
  {label: `table.header.name`},
  {label: `table.header.customer`},
  {label: `table.header.quotation`},
  {label: `table.amount`},
  {label: `table.amount.paid`},
]

export default function InvoiceList( props ) {
  const { invoices } = props
  const hasInvoices = Array.isArray( invoices ) && invoices.length
  return (
    <Table
      className="table--pres"
      columns={ columns }
    >
      {
        !hasInvoices ? ( <EmptyLine colspan="6" /> )
        : invoices.map( (invoice, i) => (
          <InvoiceRow
            key={ invoice.id }
            invoice={ invoice }
          />
        ))
      }
    </Table>
  )
}
