import   React              from 'react'
import   classNames         from 'classnames'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { Pagination } from './table.pagination.jsx'
import { Thead } from './table.header.jsx'

import './table.scss'
const BASE_CLASS = `table`

export function normalizeColumns( columns ) {
  if (typeof columns === `string`) {
    return columns.split(`,`).map( c => ({label: c.trim()}))
  }
  return columns
}

export function Row( props ) {
  return (
    <tr className={`${BASE_CLASS}__body_row`}>
      { props.children }
    </tr>
  )
}

export function EmptyLine( props ) {
  const message = `none (yet)`
  return (
    <Row>
      <td colSpan={props.colSpan} style={{textAlign: `center`}}>
        <p>{ message }</p>
      </td>
    </Row>
  )
}

export function Table( props ) {
  let { className, presentation, columns, handlePageSort } = props
  columns = normalizeColumns( columns )
  const hasFooter = props.footer != null
  const hasMeta   = props.meta   != null
  const COMP_CLASS = classNames(
    BASE_CLASS,
    className,
    presentation ? `${BASE_CLASS}--presentation` : false,
  )
  return (
    <div className={ COMP_CLASS }>
      <table cellSpacing="0" className={`${BASE_CLASS}__content`}>
        { props.title && (
        <caption className={`${BASE_CLASS}__title`}>
          <FormattedMessage id={ props.title } />
        </caption>
      )}
        <Thead
          columns={ columns }
          handlePageSort={ handlePageSort }
        />
        <tbody className={`${BASE_CLASS}__body`}>
          { props.children }
        </tbody>
        { hasFooter && props.footer }
      </table>
      { hasMeta && (
        <Pagination
          meta={ props.meta }
          handlePageSort={ handlePageSort }
        />
      )}
    </div>
  )
}

export default Table
