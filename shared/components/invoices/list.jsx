import React from 'react'
import { Link }     from 'react-router-dom'
import { connect }  from 'react-redux'

import { Table, EmptyLine } from '../ui/table.jsx'

function InvoiceRow( props ) {
  const invoice = props.invoice
  const url      = `/invoices/${invoice.id}`
  return (
    <tr>
      <td>
        <Link to={ url }>{ invoice.reference }</Link>
      </td>
      <td>
        <Link to={ url }>{ invoice.name }</Link>
      </td>
      <td></td>
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
        {label: `table.header.invoice-count`},
      ]}
      className="table--pres"
    >
      {
        !hasInvoices ? ( <EmptyLine colspan="3" /> )
        : invoices.map( (invoice, i) => (
          <InvoiceRow key={invoice.id} invoice={invoice} />
        ))
      }
    </Table>
  )
}

const state2prop = state => {
  return {
    invoices: state.invoices && state.invoices.list
  }
}

export default connect( state2prop )( InvoiceList )
