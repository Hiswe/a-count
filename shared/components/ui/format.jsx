import React from 'react'
import { FormattedNumber, FormattedDate } from 'react-intl'
import marked from 'marked'

import './format.scss'
const BASE_CLASS = `format`

function parseValue( value ) {
  const parsed = parseFloat( value, 10 )
  return Number.isFinite( value ) ? value
    : !Number.isNaN( parsed ) ? parsed
    : null
}

// react-intl doc
// • https://github.com/yahoo/react-intl/wiki/Components#formatteddate
// • https://github.com/yahoo/react-intl/wiki/Components#formattednumber

export function Amount( props ) {
  const { value, ...others} = props
  others.style = `currency`
  const safeValue = parseValue( value )
  return (
    <p className={`${BASE_CLASS} ${BASE_CLASS}--currency`}>
      { safeValue === null ? `–` : <FormattedNumber value={ value } {...others}  /> }
    </p>
  )
}

export function FormatNumber( props ) {
  const { value, ...others} = props
  const safeValue = parseValue( value )
  return (
    <p className={`${BASE_CLASS} ${BASE_CLASS}--number`}>
      { safeValue === null ? `–` : <FormattedNumber value={ value } {...others}  /> }
    </p>
  )
}

export function Percent( props ) {
  const { value, ...others} = props
  others.style = `percent`
  const safeValue = parseValue( value )
  return (
    <p className={`${BASE_CLASS} ${BASE_CLASS}--percent`}>
      { safeValue === null ? `–` : <FormattedNumber value={ value } {...others}  /> }
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
