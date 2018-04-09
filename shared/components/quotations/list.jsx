import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import * as quotations from '../../ducks/quotations.js'
import { Table, EmptyLine } from '../ui/table.jsx'
import { Amount, Date } from '../ui/format.jsx'

//----- TBODY

function QuotationStatus( props ) {
  return (
    <td>
      {props.status.message}
      <p>{props.status.date}</p>
    </td>
  )
}

function QuotationRow( props ) {
  const { quotation, showCustomer, currency, handleCreate } = props
  const id = quotation.get( `id` )
  return (
    <tr>
      <td>
        <Link to={`/quotations/${id}`}>
          { quotation.get(`reference`) }
        </Link>
      </td>
      <td>
        <Link to={`/quotations/${id}`}>
          {quotation.get(`name`)}
        </Link>
      </td>
      {showCustomer && (
        <td>
          <Link to={`/customers/${quotation.get(`customerId`)}`}>
            {quotation.get(`customer.name`)}
          </Link>
        </td>
      )}
      <td>
        <p>
          <Date value={quotation.get(`sendAt`)} />
        </p>
      </td>
      <td>
        <p>
          <Date value={quotation.get(`validatedAt`)} />
        </p>
      </td>
      <td>
        <p>
          <Date value={quotation.get(`signedAt`)} />
        </p>
      </td>
      <td>
        { quotation._hasInvoice && (
          <Link to={`/invoices/${quotation.get('invoice.id')}`}>
            { quotation.get(`invoice.reference`) }
          </Link>
        )}
        {
          quotation._canCreateInvoice && (
            <a
              href={`/quotations/${id}/create-invoice`}
              onClick={ event => {
                event.preventDefault()
                handleCreate()
              }}
            >
              <FormattedMessage id="quotation.create.invoice" />
            </a>
          )
        }
      </td>
      <td className="is-number">
        <Amount value={quotation.get(`total`) } />
      </td>
    </tr>
  )
}
//----- ALL

const defaultColumns = [
  {label: `table.header.id`},
  {label: `table.header.name`},
  {label: `table.header.customer`},
  {label: `table.header.sent`},
  {label: `table.header.validated`},
  {label: `table.header.signed`},
  {label: `table.header.invoice`},
  {label: `table.amount`},
]

function QuotationTable( props ) {
  const { quotations, currency, showCustomer = true } = props
  const hasQuotations = Array.isArray( quotations ) && quotations.length > 0
  const columns = showCustomer ? defaultColumns
    : defaultColumns.filter( col => col.label !== `table.header.customer` )
  const columnCount = columns.length

  return (
    <Table
      columns={ columns }
      className="table--pres"
    >
    {
      !hasQuotations ? ( <EmptyLine colSpan={columnCount} /> )
      : quotations.map( (q, i) => (
        <QuotationRow
          key={ q.id }
          showCustomer={ showCustomer }
          quotation={ q }
          handleCreate={ () => props.createInvoice( {params: {id: q.id}}) }
        />
      ))
    }
    </Table>
  )
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
    createInvoice: quotations.createInvoice,
  }, dispatch)
}

export default connect( null, dispatch2prop )( QuotationTable )

