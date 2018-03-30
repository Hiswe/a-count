import React from 'react'
import { FormattedNumber, FormattedDate } from 'react-intl'
import marked from 'marked'

import './format.scss'
const BASE_CLASS = `format`

// react-intl doc
// • https://github.com/yahoo/react-intl/wiki/Components#formatteddate
// • https://github.com/yahoo/react-intl/wiki/Components#formattednumber

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

export function Date( props ) {
  if ( !props.value ) return null
  return <FormattedDate value={ props.value } />
}

export function Markdown( props ) {
  const { text }  = props
  const isText    = typeof text === `string`
  const __html    = isText ? marked( text, {breaks: true} ) : ``
  return (
    <div className="markdown" dangerouslySetInnerHTML={{__html}} />
  )
}
