import   React              from 'react'
import { withRouter       } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { Icon } from './svg-icons.jsx'

const BASE_CLASS = `table`

class Pagination extends React.PureComponent {
  constructor( props ) {
    super( props )

    this.handlePrev = this.handlePrev.bind( this )
    this.handleNext = this.handleNext.bind( this )
  }

  handlePrev( event ) {
    event.preventDefault()
    const { meta, handlePagination } = this.props
    if ( !meta.previousPage ) return
    handlePagination({
      query: {
        page: meta.previousPage,
      },
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
    return (
      <footer className={`${BASE_CLASS}__pagination`}>
        <FormattedMessage id="table.pagination" values={ meta } />
        <div
          onClick={ this.handlePrev }
          className={`${BASE_CLASS}__pagination_next`}
        >
          <Icon svgId="chevron-left" />
        </div>
        <div
          onClick={ this.handleNext }
          className={`${BASE_CLASS}__pagination_prev`}
        >
          <Icon svgId="chevron-right" />
        </div>
      </footer>
    )
  }
}

const PaginationWithRouter = withRouter( Pagination )

export { PaginationWithRouter as Pagination }
