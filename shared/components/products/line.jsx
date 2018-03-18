import React from 'react'

import * as compute from '../_compute.js'
import Amount from '../ui/amount.jsx'

// only use defaultValue
// • handleChange is handled globally at the form level

const Line = props => {
  const { fieldPath, product, currency } = props
  const total = compute.productTotal( product )
  const rows = compute.textareaRows( product.description )
  return (
    <tr>
      <td>
        <textarea
          name={`${fieldPath}[description]`}
          rows={ rows }
          defaultValue={ product.description }
        />
      </td>
      <td>
        <input
          type="number" min="0" step="0.25"
          name={ `${fieldPath}[quantity]` }
          defaultValue={ product.quantity }
        />
      </td>
      <td>
        <input
          type="number"
          min="0"
          step="1"
          name={ `${fieldPath}[price]` }
          defaultValue={ product.price }
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
