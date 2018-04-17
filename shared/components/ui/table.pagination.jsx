import   React              from 'react'
import { withRouter       } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import   classNames         from 'classnames'

import { Icon } from './svg-icons.jsx'

import './table.pagination.scss'
const BASE_CLASS = `table__pagination`
const ACTION_CLASS = `${BASE_CLASS}_action`

class Pagination extends React.PureComponent {
  constructor( props ) {
    super( props )

    this.handlePrev = this.handlePrev.bind( this )
    this.handleNext = this.handleNext.bind( this )
  }

  // always pass URL params to redux actions
  // • needed for example by /customers/quotations
  handlePrev( event ) {
    event.preventDefault()
    const { meta, handlePagination, match } = this.props
    if ( !meta.previousPage ) return
    handlePagination({
      query: {
        page: meta.previousPage,
      },
      ...match.params
    })
  }

  handleNext( event ) {
    event.preventDefault()
    const { meta, handlePagination, match } = this.props
    if ( !meta.nextPage ) return
    handlePagination({
      query: {
        page: meta.nextPage,
      },
      ...match.params
    })
  }

  render() {
    const { meta } = this.props
    if ( !meta.total ) return null
    const PREV_CLASS = classNames(
      ACTION_CLASS,
      `${ACTION_CLASS}--prev`,
      meta.previousPage ? false : `${ACTION_CLASS}--disabled`,
    )
    const NEXT_CLASS = classNames(
      ACTION_CLASS,
      `${ACTION_CLASS}--next`,
      meta.nextPage ? false :  `${ACTION_CLASS}--disabled`,
    )
    return (
      <footer className={`${BASE_CLASS}`}>
        <div className={`${BASE_CLASS}_rows`}>
          <FormattedMessage id="table.rows-per-page" />
          <span className={`${BASE_CLASS}_rows-per-page`}>{ meta.limit }</span>
        </div>
        <FormattedMessage id="table.pagination" values={ meta } />
        <div className={`${BASE_CLASS}_actions`}>
          <div
            onClick={ this.handlePrev }
            className={ PREV_CLASS }
          >
            <Icon svgId="chevron-left" />
          </div>
          <div
            onClick={ this.handleNext }
            className={ NEXT_CLASS }
          >
            <Icon svgId="chevron-right" />
          </div>
        </div>
      </footer>
    )
  }
}
// we need to have access to the router
const PaginationWithRouter = withRouter( Pagination )

export { PaginationWithRouter as Pagination }
