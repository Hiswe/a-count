import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Empty, RenderFakeId, Amount } from './_utils.jsx'

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
    <table className="table-pres" cellSpacing="0">
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>customer</th>
          <th>status</th>
          <th>total HT</th>
          <th>total</th>
        </tr>
      </thead>
      <tbody>
        {
          !hasQuotations ? ( <Empty /> )
          : props.quotations.map( (q, i) => (
            <QuotationRow key={q.id} quotation={q} />
          ))
        }
      </tbody>
    </table>
  )
}

export { QuotationTable as default }
