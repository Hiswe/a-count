import React from 'react'

import './amount.scss'

const BASE_CLASS = `amount`

export function formatValue( props ) {
  const { value, currency, errorMessage = `#error` } = props
  const isValidValue = Number.isFinite( value )
  const formatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    // currency: currency,
  }
  const displayValue = isValidValue ? value.toLocaleString('en', formatOptions )
    : errorMessage
  const displayCurrency = isValidValue && currency ? currency : ``
  return {
    value:    displayValue,
    currency: displayCurrency,
  }
}

export default function Amount( props ) {
  const { value, currency } = formatValue( props )
  return (
    <span className={BASE_CLASS}>
      <span className={`${BASE_CLASS}__unit`}>{currency}</span> <span className={`${BASE_CLASS}__value`}>{value}</span>
    </span>
  )
}
