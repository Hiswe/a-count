import React          from 'react';
import { connect }    from 'react-redux'

import {formatStatus, id as formatId} from './_format';
import {Empty}        from './_utils.jsx';

//----- THEAD

const InvoiceHeader = () => (
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

const InvoiceStatus = (props) => (
  <td>
    {props.status.message}
    <p>{props.status.date}</p>
  </td>
)


const Row = function (props) {
  let invoice = props.invoice
  let status  = formatStatus(invoice.time)
  return (
    <tr>
      <td>
        <a href={`/invoice/${invoice.id}`}>{invoice.id}</a>
      </td>
      <td>{invoice.title}</td>
      <td>{invoice.customer}</td>
      {status.date ? <InvoiceStatus status={status} /> : <td>-</td>}
      <td>€ {invoice.price.net}</td>
    </tr>
  )
}

function mapStateToPropIB(state) {
  return {
    ids:      state.result.invoices,
    invoices: state.entities.invoices,
  }
}

let InvoiceBody = function (props) {
  let invoicesLine = props.ids.map((id, i) => (
    <Row key={id} invoice={props.invoices[id]} />
  ))
  return (
    <tbody>
      {invoicesLine}
    </tbody>
  )
}

InvoiceBody = connect(mapStateToPropIB)(InvoiceBody)

//----- ALL

const InvoiceTable = () => (
  <table className="table-pres" cellSpacing="0">
    <InvoiceHeader />
    <InvoiceBody />
  </table>
)

function mapStateToPropIL(state) {
  let hasInvoices = state.result && state.result.invoices
  hasInvoices     = hasInvoices && state.result.invoices.length
  return {
    hasInvoices
  }
}

let InvoiceList = (props) => (
  props.hasInvoices ? <InvoiceTable /> : <Empty />
)

InvoiceList = connect(mapStateToPropIL)(InvoiceList)

export {InvoiceList as default};
