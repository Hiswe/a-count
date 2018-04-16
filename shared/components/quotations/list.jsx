import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import * as quotations from '../../ducks/quotations.js'
import { Table, EmptyLine } from '../ui/table.jsx'
import { Amount, Date } from '../ui/format.jsx'
import { Button } from '../ui/buttons.jsx'
import ButtonArchiveQuotation from './button-archive-quotation.jsx'
import ButtonCreateInvoice from './button-create-invoice.jsx'
import ButtonShowInvoice from './button-show-invoice.jsx'

function QuotationRow( props ) {
  const { quotation, hideCustomer, hideInvoice } = props
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
      {!hideCustomer && (
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
      {!hideInvoice && (
        <td>
          <ButtonShowInvoice  quotation={ quotation } />
          <ButtonCreateInvoice quotation={ quotation } />
        </td>
      )}
      <td className="is-number">
        <Amount value={quotation.get(`total`) } />
      </td>
      <td className="is-action">
        <ButtonArchiveQuotation icon quotation={ quotation } />
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
  {label: false },
]

export default function QuotationTable( props ) {
  const {
    quotations,
    hideInvoice  = false,
    hideCustomer = false,
  } = props
  const hasQuotations = Array.isArray( quotations ) && quotations.length > 0
  let columns = defaultColumns
  if ( hideCustomer ) {
    columns = columns.filter( col => col.label !== `table.header.customer` )
  }
  if ( hideInvoice ) {
    columns = columns.filter( col => col.label !== `table.header.invoice` )
  }
  const columnCount = columns.length

  return (
    <Table
      columns={ columns }
      className="table--pres"
    >
    {
      !hasQuotations ? ( <EmptyLine colSpan={ columnCount } /> )
      : quotations.map( (q, i) => (
        <QuotationRow
          key={ q.id }
          hideCustomer={ hideCustomer }
          hideInvoice={  hideInvoice }
          quotation={ q }
        />
      ))
    }
    </Table>
  )

}

