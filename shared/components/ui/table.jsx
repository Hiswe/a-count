import React from 'react'
import { FormattedMessage } from 'react-intl'

import './table.scss'

export function normalizeColumns( columns ) {
  if (typeof columns === `string`) {
    return columns.split(`,`).map( c => ({label: c.trim()}))
  }
  return columns
}

export function Th( props ) {
  const { label, ...rest } = props
  return (
    <th {...rest}>
      { label && <FormattedMessage id={label.trim()} /> }
    </th>
  )
}

export function Thead( props ) {
  const { columns } = props
  return (
    <thead>
      <tr>
        { columns.map( (c, i) => (<Th key={i} {...c} />) ) }
      </tr>
    </thead>
  )
}

export function EmptyLine( props ) {
  const message = `none (yet)`
  return (
    <tr>
      <td colSpan={props.colSpan} style={{textAlign: `center`}}>
        <p>{ message }</p>
      </td>
    </tr>
  )
}

export function Table( props ) {
  const columns = normalizeColumns( props.columns )
  const hasFooter = props.footer != null
  const COMP_CLASS = [`table`]
  if ( props.className ) COMP_CLASS.push( props.className )
  return (
    <table className={COMP_CLASS.join(` `)} cellSpacing="0">
      <Thead columns={columns} />
      <tbody>
        { props.children }
      </tbody>
      { hasFooter && props.footer }
    </table>
  )
}

export default Table
