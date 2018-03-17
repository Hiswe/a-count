import React from 'react'

// TODO: value should be formated according to locale
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
export function formatValue( props ) {
  const { value, currency } = props
  const isValidValue = Number.isFinite( value )
  const displayValue = isValidValue ? value.toFixed( 2 ) : `#error`
  const displayCurrency = isValidValue && currency ? currency : ``
  return { value: displayValue, currency: displayCurrency }
}

export default function Amount( props ) {
  const { value, currency } = formatValue( props )
  return (
    <span className="amount">
      <span className="amount__unit">{currency}</span> <span className="amount__value">{value}</span>
    </span>
  )
}
