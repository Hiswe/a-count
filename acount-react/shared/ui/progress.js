import React from 'react'

import { Percent } from './format'

import './progress.scss'
const BASE_CLASS = `progress`

export function Progress( props ) {
  const { max, value, tableLayout } = props
  const percent    = value / max
  const cssPercent = Math.max( 0, Math.min(100, percent * 100) )
  const width      = Number.isNaN( cssPercent ) ? `0` : `${ cssPercent }%`
  const COMP_CLASS = [ BASE_CLASS ]
  if ( tableLayout ) COMP_CLASS.push( `${BASE_CLASS}--table-layout` )
  return (
    <dl className={ COMP_CLASS.join(` `) } >
      <dt className={`${BASE_CLASS}__label`}>
        <Percent value={ percent } />
      </dt>
      <dd
        className={`${BASE_CLASS}__bar`}
        style={{width}}
      />
    </dl>
  )
}
