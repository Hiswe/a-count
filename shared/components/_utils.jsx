import React from 'react'

const Empty = () => (
  <p>none (yet)</p>
)

const Amount = (props) => {
  const { value } = props
  const isValid = Number.isFinite( value )
  const unit = isValid ? `€\u00A0` : ``
  const display = isValid ? value : `#error`
  return (
  <p className="amount">
    {unit} <span>{display}</span>
  </p>
)}

export {
  Empty,
  Amount,
}
