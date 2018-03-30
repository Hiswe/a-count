import React from 'react'

import './svg-icons.scss'
const BASE_CLASS = `svg-icon`

export default function Icon( props ) {
  const { svgId, className, ...other } = props
  const COMP_CLASS = [
    BASE_CLASS,
    `icon-${ svgId }`,
  ]
  if ( className ) COMP_CLASS.push( className )
  return (
    <svg
      role="img"
      className={ COMP_CLASS.join(` `) }
      {...other}
    >
      <use xlinkHref={`#icon-${ svgId }`}></use>
    </svg>
  )
}
