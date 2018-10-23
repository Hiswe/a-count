import   React              from 'react'
import   crio               from 'crio'
import   classNames         from 'classnames'
import { FormattedMessage } from 'react-intl'

import { Icon } from '../ui/svg-icons'

const BASE_CLASS      = `table__pagination`
const ACTION_CLASS    = `${BASE_CLASS}_action`
const emptyPagination = crio({
  start:  `-`,
  end:    `-`,
  total:  `-`,
})

export function Pagination( props ) {
  const { meta, handlePrev, handleNext } = props
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
  // be sure to feed the a pagination to I18N
  // https://github.com/Hiswe/a-count/issues/65
  const pagination  = emptyPagination.merge(null ,meta)
  return (
    <footer className={`${BASE_CLASS}`}>
      <div className={`${BASE_CLASS}_rows`}>
        <FormattedMessage id="table.rows-per-page" />
        <span className={`${BASE_CLASS}_rows-per-page`}>{ meta.limit }</span>
      </div>
      <FormattedMessage id="table.pagination" values={ pagination } />
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
