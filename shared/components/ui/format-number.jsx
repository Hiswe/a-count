import React from 'react'
import { FormattedNumber } from 'react-intl'

const BASE_CLASS = `number`

export function Amount( props ) {
  return (
    <p className={`${BASE_CLASS} ${BASE_CLASS}--currency`}>
      <FormattedNumber
        style="currency"
        value={ props.value }
        currency={ props.currency }
      />
    </p>
  )
}

export function Percent( props ) {
  return (
    <p className={`${BASE_CLASS} ${BASE_CLASS}--percent`}>
      <FormattedNumber
        style="percent"
        value={ props.value / 100 }
      />
    </p>
  )
}
