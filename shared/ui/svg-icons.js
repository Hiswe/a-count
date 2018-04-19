import React      from 'react'
import classNames from 'classnames'
import PropTypes  from 'prop-types'

import './svg-icons.scss'
const BASE_CLASS = `svg-icon`

export function Icon( props ) {
  const { svgId, className, ...other } = props
  const COMP_CLASS = classNames( BASE_CLASS, `icon-${ svgId }`, className )
  return (
    <svg
      role="img"
      className={ COMP_CLASS }
      {...other}
    >
      <use xlinkHref={`#icon-${ svgId }`}></use>
    </svg>
  )
}

Icon.PropTypes = {
  svgId: PropTypes.string.isRequired,
}

export default Icon
