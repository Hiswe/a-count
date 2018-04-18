import   React              from 'react'
import   classNames         from 'classnames'
import { FormattedMessage } from 'react-intl'

import { Icon } from './svg-icons'

import './table.pagination.scss'
const BASE_CLASS   = `table__pagination`
const ACTION_CLASS = `${BASE_CLASS}_action`

export function Pagination( props ) {
  const { meta, handlePrev, handleNext } = props
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
          onClick={ handlePrev }
          className={ PREV_CLASS }
        >
          <Icon svgId="chevron-left" />
        </div>
        <div
          onClick={ handleNext }
          className={ NEXT_CLASS }
        >
          <Icon svgId="chevron-right" />
        </div>
      </div>
    </footer>
  )
}
