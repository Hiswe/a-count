import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Table from '../ui/table.jsx'
import EmptyLine from '../ui/table-empty-line.jsx'
import { Amount, Percent } from '../ui/format-number.jsx'

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
  const { quotation, defaultQuotation } = props
  return (
    <tr>
      <td>
        <Link to={`/quotations/${quotation.id}`}>
          { quotation.reference }
        </Link>
      </td>
      <td>
        <Link to={`/quotations/${quotation.id}`}>
          {quotation.name}
        </Link>
      </td>
      <td>
        <Link to={`/customers/${quotation.customerId}`}>
          {quotation.customerName}
        </Link>
      </td>
      <td></td>
      {/* {status.date ? <QuotationStatus status={status} /> : <td>-</td>} */}
      <td className="is-number">
        <Percent value={quotation.tax} />
      </td>
      <td className="is-number">
        <Amount
          value={quotation._total.net}
          currency={ defaultQuotation.currency }
        />
      </td>
      <td className="is-number">
        <Amount
          value={quotation._total.all}
          currency={ defaultQuotation.currency }
        />
      </td>
    </tr>
  )
}
//----- ALL

function QuotationTable( props ) {
  const { quotations, defaultQuotation } = props
  const hasQuotations = Array.isArray( quotations ) && quotations.length > 0
  return (
    <Table
      columns={[
        {label: `table.header.id`},
        {label: `table.header.name`},
        {label: `table.header.customer`},
        {label: `table.header.status`},
        {label: `table.header.tax`},
        {label: `table.amount-ht`},
        {label: `table.amount`},
      ]}
      className="table--pres"
    >
    {
      !hasQuotations ? ( <EmptyLine colspan="6" /> )
      : quotations.map( (q, i) => (
        <QuotationRow
          key={ q.id }
          quotation={ q }
          defaultQuotation={ defaultQuotation }
        />
      ))
    }
    </Table>
  )
}

function state2prop( state ) {
  return {
    quotations:       state.quotations && state.quotations.list,
    user:             state.users.current,
    defaultQuotation: state.users.current && state.users.current.defaultQuotation
  }
}

export default connect( state2prop )( QuotationTable )

