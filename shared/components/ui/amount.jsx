import React from 'react'

const Amount = (props) => {
  const { value } = props
  const isInvalid = !Number.isFinite( value )
  const currency = isInvalid ? ``
    : props.currency ? props.currency
    : ``
  const display = isInvalid ? `#error` : value.toFixed( 2 )
  return (
  <p className="amount">
    <span className="amount__unit">{currency}</span> <span className="amount__value">{display}</span>
  </p>
)}

export default Amount
