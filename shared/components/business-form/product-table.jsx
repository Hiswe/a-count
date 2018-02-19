import React from 'react'

import { Input } from '../form.jsx'
import { Amount } from '../_utils.jsx'

const Line = (props) => {
  const { product } = props
  if (!product) return null
  const total = product.quantity * product.price
  const i = `products[${props.index}]`
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
        { props.defaultProduct ? null
        : <button className="" formAction="/quotation/remove-line" formMethod="post" name="removeIndex" value={props.index}>remove</button>
        }
      </td>
    </tr>
  )
}

////////
// WHOLE BLOCK
////////

const ProductTable = (props) => {
  const { formData } = props
  const { products } = formData
  const hasProducts = Array.isArray( products )
  const productsLength = hasProducts ? products.length : 0
  return (
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
      <tbody>
        { !hasProducts ? null
          : formData.products.map( (p, i) => (<Line key={i} index={i} product={p} />) )
        }
        <Line key={productsLength} index={productsLength} product={formData.defaultProduct} defaultProduct={true} />
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3">Total net</td>
          <td><Amount value={formData.totalNet} /></td>
          <td></td>
        </tr>
        <tr>
          <td colSpan="3">Taxes</td>
          <td><Amount value={formData.totalTax} /></td>
          <td></td>
        </tr>
        <tr>
          <td colSpan="3">Total with taxes</td>
          <td><Amount value={formData.total} /></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  )
}

export { ProductTable as default }
