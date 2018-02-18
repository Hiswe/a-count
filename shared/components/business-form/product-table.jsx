import React from 'react'

import { Input } from '../form.jsx'
import { Amount } from '../_utils.jsx'

//----- TBODY

let Line          = (props) => {
  let product     = props.product
  let total       = product.quantity * product.price;
  let i           = `products[${props.index}]`;
  return (
    <tr>
      <td>
        <textarea name={`${i}[description]`} rows="1" defaultValue={product.description} />
      </td>
      <td>
        <input type="number" min="0" step="0.25" name={`${i}[quantity]`} defaultValue={product.quantity} />
      </td>
      <td>
        <input type="number" min="0" step="10" name={`${i}[price]`} defaultValue={product.price} />
      </td>
      <td className="total">
        <Amount value={total} />
      </td>
      <td>
        <button className="btn-circular" formAction="/quotation/remove-line" formMethod="post" name="removeIndex" value={props.index}>×</button>
      </td>
    </tr>
  )
}

let Tbody = (props) => (
  <tbody>
    {props.products.map( (p, i) => ( <Line key={i} index={i} product={p} /> ) )}
  </tbody>
)

//----- TFOOT

let Tfoot = (props) => (
  <tfoot>
    <tr>
      <td colSpan="3">Total net</td>
      <td><Amount value={props.net} /></td>
      <td></td>
    </tr>
    <tr>
      <td colSpan="3">Taxes</td>
      <td><Amount value={props.taxes} /></td>
      <td></td>
    </tr>
    <tr>
      <td colSpan="3">Total with taxes</td>
      <td><Amount value={props.total} /></td>
      <td></td>
    </tr>
  </tfoot>
)

////////
// WHOLE BLOCK
////////

const ProductTable = (props) => (
  <table className="table-form" cellSpacing="0">
    <thead>
      <tr>
        <th>Désignation</th>
        <th>Jours</th>
        <th>PU HT</th>
        <th>Total HT</th>
        <th></th>
      </tr>
    </thead>
    {/* <Tbody {...props.params} />
    <Tfoot {...props.params} /> */}
  </table>
    // <Actions {...props.params} />
)

export { ProductTable as default }
