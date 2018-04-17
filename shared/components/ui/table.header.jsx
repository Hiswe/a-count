import   React              from 'react'
import { FormattedMessage } from 'react-intl'

const BASE_CLASS = `table__head`

export function Thead( props ) {
  const { columns } = props
  return (
    <thead className={ BASE_CLASS }>
      <tr className={`${BASE_CLASS}_row`}>
        { columns.map( (c, i) => (<Th key={i} {...c} />) ) }
      </tr>
    </thead>
  )
}

export function Th( props ) {
  const { label, ...rest } = props
  return (
    <th {...rest}>
      { label && <FormattedMessage id={label.trim()} /> }
    </th>
  )
}
