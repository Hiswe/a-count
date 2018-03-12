import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Table from '../ui/table.jsx'
import { Empty, RenderFakeId, Amount } from '../_utils.jsx'

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
  const { quotation } = props
  return (
    <tr>
      <td>
        <Link to={`/quotations/${quotation.id}`}>
          <RenderFakeId count={quotation.count} />
        </Link>
      </td>
      <td>{quotation.name}</td>
      <td>
        <Link to={`/customers/${quotation.customerId}`}>
          {quotation.customerName}
        </Link>
      </td>
      <td></td>
      {/* {status.date ? <QuotationStatus status={status} /> : <td>-</td>} */}
      <td><Amount value={quotation.totalNet} /></td>
      <td><Amount value={quotation.total} /></td>
    </tr>
  )
}
//----- ALL

const QuotationTable = (props) => {
  const { quotations } = props
  const hasQuotations = Array.isArray( quotations ) && quotations.length
  return (
    <Table columns="id, title, customer, status, total HT, total" className="table--pres">
      {
        !hasQuotations ? ( <Empty colspan="6" /> )
        : quotations.map( (q, i) => (
          <QuotationRow key={q.id} quotation={q} />
        ))
      }
    </Table>
  )
}

export { QuotationTable as default }
