import React from 'react'

import * as compute from '../_compute.js'
import Amount from '../ui/amount.jsx'

// only use defaultValue
// • handleChange is handled globally at the form level

const Line = props => {
  const { fieldPath, product, readOnly, currency } = props
  const total = compute.productTotal( product )
  const rows = compute.textareaRows( product.description )
  return (
    <tr>
      <td>{
        readOnly ? <p>{ product.description }</p>
          : <textarea
          name={`${fieldPath}[description]`}
          rows={ rows }
          defaultValue={ product.description }
        />
      }</td>
      <td className="is-number">{
        readOnly ? <p>{ product.quantity }</p>
          : <input
        type="number" min="0" step="0.25"
        name={ `${fieldPath}[quantity]` }
        defaultValue={ product.quantity }
      />
      }
      </td>
      <td className="is-number">{
        readOnly ? <p>{ product.price }</p>
          : <input
            type="number"
            min="0"
            step="1"
            name={ `${fieldPath}[price]` }
            defaultValue={ product.price }
          />
      }</td>
      <td className="is-total is-number">
        <Amount value={ total } currency={ currency } />
      </td>
      <td>
        { props.children }
      </td>
    </tr>
  )
}

export default Line
