import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Empty, RenderFakeId } from './_utils.jsx'

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
        <Link to={`customers/${quotation.customerId}`}>
          {quotation.customerName}
        </Link>
      </td>
      <td></td>
      {/* {status.date ? <QuotationStatus status={status} /> : <td>-</td>} */}
      <td></td>
      {/* <td>€ {quotation.price.net}</td> */}
    </tr>
  )
}
//----- ALL

const QuotationTable = (props) => (
  <table className="table-pres" cellSpacing="0">
    <thead>
      <tr>
        <th>id</th>
        <th>title</th>
        <th>customer</th>
        <th>status</th>
        <th>total HT</th>
      </tr>
    </thead>
    <tbody>
      { props.quotations.map( (q, i) => (
        <QuotationRow key={q.id} quotation={q} />
      ))}
    </tbody>
  </table>
)

const QuotationList = (props) => (
  props.hasQuotations ? <QuotationTable {...props} /> : <Empty />
)

export { QuotationTable as default }
