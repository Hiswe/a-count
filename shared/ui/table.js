import   React              from 'react'
import   classNames         from 'classnames'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { Pagination } from './table.pagination'
import { Thead } from './table.header'

import './table.scss'
const BASE_CLASS = `table`

// ensure that we have a type for the columns
export function normalizeColumns( columns ) {
  return columns.map( col => {
    if ( col.type == null ) col.type = `text`
    return col
  })
}

// Create a context for passing col types all down
const TableContext = React.createContext( [] )

export function Cell( props ) {
  const { type, ...rest } = props
  const COMP_CLASS = classNames(
    `${BASE_CLASS}__body_col`,
    type.split(` `).map(t => `${BASE_CLASS}__body_col--is-${ t }`)
  )
  return (
    <td className={ COMP_CLASS } {...rest}>
      { props.children }
    </td>
  )
}

export function Row( props ) {
  let colCount = -1
  return (
    <TableContext.Consumer>
      { columns => (
        <tr className={`${BASE_CLASS}__body_row`}>
          { React.Children.map( props.children, (child, index) => {
            if ( child === null) return null
            colCount += 1
            return React.cloneElement( child, {
              type: child.props.type || columns[ colCount ].type
            })
          })}
        </tr>
      )}
    </TableContext.Consumer>
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
      <TableContext.Provider value={ columns }>
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
      </TableContext.Provider>
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
