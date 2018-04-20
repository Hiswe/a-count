import   React                            from 'react'
import   PropTypes                        from 'prop-types'
import { connect         }                from 'react-redux'
import { FormattedNumber, FormattedDate } from 'react-intl'
import   marked                           from 'marked'

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
    <span className={`${BASE_CLASS} ${BASE_CLASS}--currency`}>
      { safeValue === null ? `–` : <FormattedNumber value={ value } currency={ currency } {...others}  /> }
    </span>
  )
}

export const Amount = connect(
  state => ({
    currency: state.account.get( `user.currency` ),
  })
)( AmountPres )

Amount.propTypes = {
  value: PropTypes.number,
}

export function FormatNumber( props ) {
  const { value, wrapperProps = {}, ...others} = props
  const safeValue = parseValue( value )
  return (
    <span className={`${BASE_CLASS} ${BASE_CLASS}--number`} {...wrapperProps}>
      { safeValue === null ? `–` : <FormattedNumber value={ value } {...others}  /> }
    </span>
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

export function Day( props ) {
  if ( !props.value ) return <span>–</span>
  return <FormattedDate value={ props.value } />
}
Day.propTypes = {
  value: PropTypes.string
}

export function Markdown( props ) {
  const { text }  = props
  const isText    = typeof text === `string`
  const __html    = isText ? marked( text, {breaks: true} ) : ``
  return (
    <div className="markdown" dangerouslySetInnerHTML={{__html}} />
  )
}

