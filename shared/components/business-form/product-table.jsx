import React from 'react'

import { Input } from '../form.jsx'
import { Amount } from '../_utils.jsx'

const Product = (props) => {
  const { product, onChange, handleRemoveProduct, defaultProduct, isNewProduct } = props
  if (!product) return null
  const i = `products[${props.index}]`
  const safeProduct = isNewProduct ? product : defaultProduct.merge(null, product )
  const total = safeProduct.quantity * safeProduct.price
  return (
    <tr>
      <td>
        <textarea name={`${i}[description]`} rows="1" value={safeProduct.description} onChange={onChange} />
      </td>
      <td>
        <input type="number" min="0" step="0.25" name={`${i}[quantity]`} value={safeProduct.quantity} onChange={onChange} />
      </td>
      <td>
        <input type="number" min="0" step="10" name={`${i}[price]`} value={safeProduct.price} onChange={onChange} />
      </td>
      <td className="total">
        <Amount value={total} />
      </td>
      <td>
        { !isNewProduct && <button onClick={handleRemoveProduct} type="button" value={i}>remove</button> }
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
            return (
              <Product key={i} index={i} product={p} defaultProduct={formData.defaultProduct} handleRemoveProduct={handleRemoveProduct} onChange={onChange} />
            )
          })
        }
        <Product key={productsLength} index={productsLength} product={formData.defaultProduct}
          isNewProduct={true} onChange={onChange} />
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
