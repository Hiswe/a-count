import   React              from 'react'
import   classNames         from 'classnames'
import { FormattedMessage } from 'react-intl'
import { withRouter       } from 'react-router-dom'

import { Icon } from '../ui/svg-icons'

const BASE_CLASS = `table__head`

function Th( props ) {
  const {
    column,
    onClick,
    isSorted,
    dir,
  }  = props
  const { label, sort, type, ...rest } = column

  const safeType = type ? type : `text`

  const COMP_CLASS = classNames(
    `${BASE_CLASS}_col`,
    safeType.split(` `).map(t => `${BASE_CLASS}_col--is-${ t }`),
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
  const { columns, hideColumns, handleSort, sort, dir } = props

  return (
    <thead className={ BASE_CLASS }>
      <tr className={`${BASE_CLASS}_row`}>
      { columns.map( (column, index) => {
        if ( hideColumns.includes(column.id) ) return null
        return ( <Th
          key={ index }
          column={ column }
          isSorted={ column.sort && sort === column.sort }
          dir={ dir }
          onClick={ !column.sort ? null : event => handleSort(event, column.sort ) }
        />)
      })}
      </tr>
    </thead>
  )
}
