import React from 'react'
import classNames from 'classnames'

import './alerts.scss'
const BASE_CLASS = `alert`

export function Alert( props ) {
  const { warning = false, danger = false } = props
  const COMP_CLASS = classNames(BASE_CLASS, {
    [`${BASE_CLASS}--warning`]: warning,
    [`${BASE_CLASS}--danger` ]: danger ,
  })

  return (
    <div className={ COMP_CLASS }>
      { props.children }
    </div>
  )
}
