import   React              from 'react'
import   classNames         from 'classnames'
import   PropTypes          from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link, withRouter } from 'react-router-dom'

import { Pagination } from './pagination'
import { Thead      } from './header'

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
export { TableFooter as Footer }

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
  const { columns, hideColumns } = props
  const colSpan = columns.filter( column => !hideColumns.includes(column.id) ).length
  return (
    <tr className={`${BASE_CLASS}__body_row`}>
      <Cell colSpan={ colSpan } type="empty" >
        <FormattedMessage id="table.empty" />
      </Cell>
    </tr>
  )
}

export function computeSortQuery( currentSorting, sort ) {
  const isSameSort = currentSorting.sort === sort
  if ( !isSameSort ) return { sort, dir: `ASC` }
  const isAscDir   = currentSorting.dir === `ASC`
  if ( isAscDir )    return { sort, dir: `DESC` }
  return {}
}

export class PaginatedTable extends React.PureComponent {

  static defaultProps = {
    hideColumns: [],
  }

  static propTypes = {
    columns        : PropTypes.arrayOf( PropTypes.object ).isRequired,
    hideColumns    : PropTypes.arrayOf( PropTypes.string ),
    hideOnEmpty    : PropTypes.bool,
    meta           : PropTypes.object,
    handlePageSort : PropTypes.func,
    footer         : PropTypes.element,
  }

  constructor( props ) {
    super( props )

    this.state = {
      sort   : undefined,
      dir    : undefined,
    }
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
      handlePageSort,
      hideOnEmpty,
    } = props
    const hasRows   = React.Children.count( props.children ) > 0
    const hasFooter = props.footer != null
    const hasMeta   = props.meta   != null
    const COMP_CLASS = classNames(
      BASE_CLASS,
      className,
      presentation ? `${BASE_CLASS}--presentation` : false,
    )

    if ( hideOnEmpty && !hasRows ) return null

    return (
      <div className={ COMP_CLASS }>
        <table cellSpacing="0" className={`${BASE_CLASS}__content`}>
          { props.title && (
            <caption className={`${BASE_CLASS}__title`}>
              <FormattedMessage id={ props.title } />
            </caption>
          )}
          <Thead
            columns={ props.columns }
            hideColumns={ props.hideColumns }
            handleSort={ this.handleSort }
            sort={ state.sort }
            dir={ state.dir }
          />
          <TableContext.Provider value={{
            columns    : props.columns,
            hideColumns: props.hideColumns,
          }}>
            <tbody className={`${BASE_CLASS}__body`}>
            { hasRows ? props.children : (
              <EmptyLine
                columns={ props.columns }
                hideColumns={ props.hideColumns}
              />
            )}
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

// we need to have access to the router
// • the redux actions may need to access to route params
export const Table = withRouter( PaginatedTable )
export { Table as Wrapper }

export default Table
