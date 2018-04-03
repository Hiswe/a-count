import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Table, EmptyLine } from '../ui/table.jsx'
import { Amount, Percent } from '../ui/format.jsx'

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
  const { quotation, currency } = props
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
          currency={ currency }
        />
      </td>
      <td className="is-number">
        <Amount
          value={quotation._total.all}
          currency={ currency }
        />
      </td>
    </tr>
  )
}
//----- ALL

function QuotationTable( props ) {
  const { quotations, currency } = props
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
      !hasQuotations ? ( <EmptyLine colspan="7" /> )
      : quotations.map( (q, i) => (
        <QuotationRow
          key={ q.id }
          quotation={ q }
          currency={ currency }
        />
      ))
    }
    </Table>
  )
}

function state2prop( state ) {
  return {
    quotations: state.quotations && state.quotations.list,
    currency  : state.account.get( `current.currency` ),
  }
}

export default connect( state2prop )( QuotationTable )

