import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Table from '../ui/table.jsx'
import EmptyLine from '../ui/table-empty-line.jsx'
import Amount from '../ui/amount.jsx'
import FakeId from '../ui/fake-id.jsx'

//----- TBODY

const QuotationStatus = props => {
  return (
    <td>
      {props.status.message}
      <p>{props.status.date}</p>
    </td>
  )
}

const QuotationRow = props => {
  const { quotation, defaultQuotation } = props
  return (
    <tr>
      <td>
        <Link to={`/quotations/${quotation.id}`}>
          <FakeId
            count={ quotation.index }
            prefix={ defaultQuotation.prefix }
            startAt={ defaultQuotation.startAt }
          />
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
      <td><Amount value={quotation.tax} /></td>
      <td><Amount value={quotation._total.net} /></td>
      <td><Amount value={quotation._total.all} /></td>
    </tr>
  )
}
//----- ALL

const QuotationTable = props => {
  const { quotations, defaultQuotation } = props
  const hasQuotations = Array.isArray( quotations ) && quotations.length > 0
  return (
    <Table columns="id, title, customer, status, tax, total HT, total" className="table--pres">
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

const state2prop = state => {
  return {
    quotations:       state.quotations && state.quotations.list,
    user:             state.users.current,
    defaultQuotation: state.users.current && state.users.current.defaultQuotation
  }
}

export default connect( state2prop )( QuotationTable )

