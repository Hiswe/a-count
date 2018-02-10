import React          from 'react'
import { connect }    from 'react-redux'
import { Link }     from 'react-router-dom'

import {formatStatus, id as formatId} from './_format';
import {Empty}        from './_utils.jsx';

//----- THEAD

const QuotationHeader = () => (
  <thead>
    <tr>
      <th>id</th>
      <th>title</th>
      <th>customer</th>
      <th>status</th>
      <th>total HT</th>
    </tr>
  </thead>
)

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
  let quotation = props.quotation
  let status    = formatStatus(quotation.time)
  return (
    <tr>
      <td><a href={`/quotation/${quotation.id}`}>{quotation.id}</a></td>
      <td>{quotation.title}</td>
      <td>{quotation.customer}</td>
      {status.date ? <QuotationStatus status={status} /> : <td>-</td>}
      <td>€ {quotation.price.net}</td>
    </tr>
  )
}

function mapStateToPropQB(state) {
  return {
    ids:        state.result.quotations,
    quotations: state.entities.quotations,
  }
}

let QuotationBody = function (props) {
  let quotationLines = props.ids.map( (id, i) => (
    <QuotationRow key={id} quotation={props.quotations[id]} />
  ))

  return (
    <tbody>
      {quotationLines}
    </tbody>
  )
}

QuotationBody = connect(mapStateToPropQB)(QuotationBody)

//----- ALL

const QuotationTable = () => (
  <table className="table-pres" cellSpacing="0">
    <QuotationHeader />
    <QuotationBody />
  </table>
)

function mapStateToPropQL(state) {
  let hasQuotations = state.result && state.result.quotations
  hasQuotations     = hasQuotations && state.result.quotations.length
  return {
    hasQuotations
  }
}

let QuotationList = (props) => (
  props.hasQuotations ? <QuotationTable /> : <Empty />
)

QuotationList = connect(mapStateToPropQL)(QuotationList)

export {QuotationList as default};
