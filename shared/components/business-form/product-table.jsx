import React from 'react'

import { Input } from '../form.jsx'
import { Amount } from '../_utils.jsx'

const Product = (props) => {
  const { product, index, onChange, handleRemoveProduct, isLast } = props
  if (!product) return null
  const hasDescription = typeof product.description === 'string'
  const rowsHeight = !hasDescription ? 1
    : Math.max(1, product.description.split('\n').length)
  const i = `products[${index}]`
  const total = product.quantity * product.price
  return (
    <tr>
      <td>
        <textarea name={`${i}[description]`} rows={rowsHeight} value={product.description} onChange={onChange} />
      </td>
      <td>
        <input type="number" min="0" step="0.25" name={`${i}[quantity]`} value={product.quantity} onChange={onChange} />
      </td>
      <td>
        <input type="number" min="0" step="10" name={`${i}[price]`} value={product.price} onChange={onChange} />
      </td>
      <td className="total">
        <Amount value={total} />
      </td>
      <td>
        { !isLast && <button onClick={() => handleRemoveProduct(index, i)} type="button" value={i}>remove</button> }
      </td>
    </tr>
  )
}

////////
// WHOLE BLOCK
////////

const ProductTable = (props) => {
  const { formData, onChange, handleRemoveProduct } = props
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
      { hasProducts && formData.products.map( (p, i) => {
        const isLast = i === productsLength -1
          return (
            <Product key={i} index={i} isLast={isLast} product={p}
              handleRemoveProduct={handleRemoveProduct} onChange={onChange} />
          )
        })
      }
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
