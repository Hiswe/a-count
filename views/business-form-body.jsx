import React            from 'react'

import { connect }      from 'react-redux'
import { Link }         from 'react-router'

import { Input }        from './form.jsx'
import { getInformationsFromFakeId, Amount }   from './_utils'

////////
// META
////////

let Actions = (props) => {
  if (props.isInvoice) return null
  return (
    <div className="detail-actions">
      <button className="btn-secondary" formAction="/quotation/recompute" formMethod="post">
        recompute
      </button>
      {'\u00A0'}
      <button className="btn-secondary" formAction="/quotation/add-line" formMethod="post">
        Add a line
      </button>
    </div>
  )
}

Actions = connect(getInformationsFromFakeId)(Actions)

let Title = (props) => (
  <Input name="title" defaultValue={props.businessForm.title} />
)

Title = connect(getInformationsFromFakeId)(Title)


////////
// BODY
////////

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

function mapTbody(state, ownProps) {
  let infos = getInformationsFromFakeId(state, ownProps)
  return { products: infos.businessForm.products }

}

Tbody = connect(mapTbody)(Tbody)

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

function mapTfoot(state, ownProps) {
  let infos = getInformationsFromFakeId(state, ownProps)
  return infos.businessForm.price
}

Tfoot = connect(mapTfoot)(Tfoot)

////////
// WHOLE BLOCK
////////

let Body = (props) => (
  <fieldset>
    <Title  {...props.params} />
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
      <Tbody {...props.params} />
      <Tfoot {...props.params} />
    </table>
    <Actions {...props.params} />
  </fieldset>
)

export { Body }
