import   React              from 'react'
import   PropTypes          from 'prop-types'
import { FormattedMessage } from 'react-intl'

import './key-presentation.scss'
const BASE_CLASS  = `key-presentation`

export function PresByKey( props ) {
  return (
    <dl className={ BASE_CLASS }>
      { props.children }
    </dl>
  )
}
export { PresByKey as Wrapper }

export function KeyLabel( props ) {
  return (
    <dt className={`${ BASE_CLASS}__label`}>
      <FormattedMessage {...props} />
    </dt>
  )
}
KeyLabel.propTypes = {
  id: PropTypes.string.isRequired,
}
export { KeyLabel as Label }

export function KeyValue( props ) {
  return (
    <dd className={`${ BASE_CLASS}__value`}>
      { props.children }
    </dd>
  )
}
export { KeyValue as Value }
