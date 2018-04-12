import React from 'react'
import { connect } from 'react-redux'
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

export function AmountPres( props ) {
  const { value, currency, ...others} = props
  others.style = `currency`
  const safeValue = parseValue( value )
  return (
    <p className={`${BASE_CLASS} ${BASE_CLASS}--currency`}>
      { safeValue === null ? `–` : <FormattedNumber value={ value } currency={ currency } {...others}  /> }
    </p>
  )
}

function currency2prop( state ) {
  return {
    currency: state.account.get( `user.currency` ),
  }
}

export const Amount = connect( currency2prop )( AmountPres )

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
  const { value, className, ...others} = props
  others.style = `percent`
  const safeValue = parseValue( value )
  const COMP_CLASS = [
    BASE_CLASS,
    `${BASE_CLASS}--percent`,
  ]
  if ( className ) COMP_CLASS.push( className )
  return (
    <p className={COMP_CLASS.join(` `)}>
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
