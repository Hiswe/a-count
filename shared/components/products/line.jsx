import React from 'react'

import * as compute from '../_compute.js'
import Amount from '../ui/amount.jsx'

const Line = props => {
  const { prefix, handleChange, product, currency } = props
  const total = compute.productTotal( product )
  const rows = compute.textareaRows( product.description )
  return (
    <tr>
      <td>
        <textarea
          name={`${prefix}[description]`}
          rows={ rows }
          value={ product.description }
          onChange={ e => handleChange(e) } />
      </td>
      <td>
        <input
          type="number" min="0" step="0.25"
          name={ `${prefix}[quantity]` }
          value={ product.quantity }
          onChange={ e => handleChange(e) } />
      </td>
      <td>
        <input
          type="number" min="0" step="10"
          name={ `${prefix}[price]` }
          value={ product.price }
          onChange={ e => handleChange(e) }
        />
      </td>
      <td className="total">
        <Amount value={ total } currency={ currency } />
      </td>
      <td>
        { props.children }
      </td>
    </tr>
  )
}

export default Line
