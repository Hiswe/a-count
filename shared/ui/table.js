import   React              from 'react'
import   classNames         from 'classnames'
import   PropTypes          from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link, withRouter } from 'react-router-dom'

import { Pagination } from './table.pagination'
import { Thead } from './table.header'

import './table.scss'
const BASE_CLASS = `table`

// Create a context for passing col types all down
// • we may have a wrapper around a row (like quotationRow)
//   this will make it hard to pass down those properties with a React.Children.map
const TableContext = React.createContext({
  columns:     [],
  hideColumns: [],
})

export function TableFooter( props ) {
  return (
    <tfoot className={`${BASE_CLASS}__footer`}>
      { props.children }
    </tfoot>
  )
}

export function RowFooter( props ) {
  return (
    <tr className={`${BASE_CLASS}__footer_row`}>
      { props.children }
    </tr>
  )
}

export function Cell( props ) {
  const { type, ...rest } = props
  const currentType = type ? type : `text`
  const COMP_CLASS  = classNames(
    `${BASE_CLASS}__cell`,
    currentType.split(` `).map(t => `${BASE_CLASS}__cell--is-${ t }`)
  )
  return (
    <td className={ COMP_CLASS } {...rest}>
      { props.children }
    </td>
  )
}
Cell.propTypes = {
  type: PropTypes.string,
}

export function Row( props ) {
  return (
    <TableContext.Consumer>
    { ({columns, hideColumns}) => (
      <tr className={`${BASE_CLASS}__body_row`}>
        { React.Children.map( props.children, (cell, index) => {
          const column = columns[ index ]
          // filter hidden columns
          if ( hideColumns.includes(column.id) ) return null
          // pass the right types to cell
          return React.cloneElement( cell, {
            type: cell.props.type || columns[ index ].type
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

export function computeSortQuery( currentSorting, sort ) {
  const isSameSort = currentSorting.sort === sort
  if ( !isSameSort ) return { sort, dir: `ASC` }
  const isAscDir   = currentSorting.dir === `ASC`
  if ( isAscDir )    return { sort, dir: `DESC` }
  return {}
}

// ensure that we have a type for the columns
export function normalizeColumns( columns ) {
  return columns.map( col => {
    if ( col.type == null ) col.type = `text`
    return col
  })
}

export class PaginatedTable extends React.PureComponent {

  constructor( props ) {
    super( props )

    this.state = {
      sort   : undefined,
      dir    : undefined,
    }
    this.columns    = normalizeColumns( props.columns )
    this.handleSort = this.handleSort.bind( this )
    this.handlePrev = this.handlePrev.bind( this )
    this.handleNext = this.handleNext.bind( this )
  }

  handleSort( event, sort ) {
    event.preventDefault()
    if ( !sort ) return
    const { handlePageSort, match } = this.props
    if ( !handlePageSort ) return
    const query = computeSortQuery( this.state, sort )

    handlePageSort({
      query,
      ...match.params,
    })
    this.setState( prevState => ({
      sort: query.sort,
      dir:  query.dir,
    }))
  }

  // always pass URL params to redux actions
  // • needed for example by /customers/quotations
  handlePrev( event ) {
    event.preventDefault()
    const { meta, handlePageSort, match } = this.props
    if ( !handlePageSort )    return
    if ( !meta.previousPage ) return
    handlePageSort({
      query: {
        page: meta.previousPage,
        ...this.state,
      },
      ...match.params
    })
  }

  handleNext( event ) {
    event.preventDefault()
    const { meta, handlePageSort, match } = this.props
    if ( !handlePageSort ) return
    if ( !meta.nextPage )  return
    handlePageSort({
      query: {
        page: meta.nextPage,
        ...this.state,
      },
      ...match.params
    })
  }

  render() {
    const { props, state } = this
    const {
      className,
      presentation,
      handlePageSort
    } = props
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
            columns={ this.columns }
            hideColumns={ this.props.hideColumns }
            handleSort={ this.handleSort }
            sort={ state.sort }
            dir={ state.dir }
          />
          <TableContext.Provider value={{
            columns    : this.columns,
            hideColumns: this.props.hideColumns,
          }}>
            <tbody className={`${BASE_CLASS}__body`}>
              { props.children }
            </tbody>
          </TableContext.Provider>
          { hasFooter && props.footer }
        </table>
        { hasMeta && (
          <Pagination
            meta={ props.meta }
            handlePrev={ this.handlePrev }
            handleNext={ this.handleNext }
          />
        )}
      </div>
    )
  }
}

PaginatedTable.defaultProps = {
  hideColumns: [],
}

PaginatedTable.propTypes = {
  columns        : PropTypes.arrayOf( PropTypes.object ).isRequired,
  hideColumns    : PropTypes.arrayOf( PropTypes.string )           ,
  meta           : PropTypes.object                                ,
  handlePageSort : PropTypes.func                                  ,
  footer         : PropTypes.element                               ,
}

// we need to have access to the router
// • the redux actions may need to access to route params
export const Table = withRouter( PaginatedTable )

export default Table
