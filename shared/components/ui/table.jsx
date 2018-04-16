import React      from 'react'
import classNames from 'classnames'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { Pagination } from './table.pagination.jsx'

import './table.scss'
const BASE_CLASS = `table`

export function normalizeColumns( columns ) {
  if (typeof columns === `string`) {
    return columns.split(`,`).map( c => ({label: c.trim()}))
  }
  return columns
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

export function Th( props ) {
  const { label, ...rest } = props
  return (
    <th {...rest}>
      { label && <FormattedMessage id={label.trim()} /> }
    </th>
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
  let { className, presentation, columns, handlePagination } = props
  columns = normalizeColumns( columns )
  const hasFooter = props.footer != null
  const hasMeta   = props.meta   != null
  const COMP_CLASS = classNames( BASE_CLASS, className, {
    [`${BASE_CLASS}--presentation`]: presentation,
  })
  return (
    <div className={ COMP_CLASS }>
      <table cellSpacing="0">
        <Thead columns={ columns } />
        <tbody>
          { props.children }
        </tbody>
        { hasFooter && props.footer }
      </table>
      { hasMeta && (
        <Pagination
          meta={ props.meta }
          handlePagination={ handlePagination }
        />
      )}
    </div>
  )
}

export default Table
