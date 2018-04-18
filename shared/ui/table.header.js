import   React              from 'react'
import   classNames         from 'classnames'
import { FormattedMessage } from 'react-intl'
import { withRouter       } from 'react-router-dom'

import { Icon } from './svg-icons'

const BASE_CLASS = `table__head`

function Th( props ) {
  const {
    column,
    onClick,
    isSorted,
    dir,
  }  = props
  const { label, sort, type, ...rest } = column

  const COMP_CLASS = classNames(
    `${BASE_CLASS}_col`,
    type.split(` `).map(t => `${BASE_CLASS}_col--is-${ t }`),
  )

  return (
    <th
      onClick={ onClick }
      className={ COMP_CLASS }
      {...rest}
    >
      { isSorted && <Icon svgId={ dir === `ASC` ? `arrow-upward` : `arrow-downward` } /> }
      { label && <FormattedMessage id={label.trim()} /> }
    </th>
  )
}

export function Thead( props ) {
  const { columns, handleSort, sort, dir } = props

  return (
    <thead className={ BASE_CLASS }>
      <tr className={`${BASE_CLASS}_row`}>
        { columns.map( (c, i) => (
          <Th
            key={ i }
            column={ c }
            isSorted={ c.sort && sort === c.sort }
            dir={ dir }
            onClick={ !c.sort ? null : event => handleSort(event, c.sort ) }
          />)) }
      </tr>
    </thead>
  )
}
