import React from 'react'
import { Link } from 'react-router-dom'

import Icon from './svg-icons.jsx'

import './buttons.scss'
const BASE_CLASS = `button`

export function Button( props ) {
  const { className, to, secondary, danger,...others } = props
  const COMP_CLASS = [ BASE_CLASS ]
  if ( className ) COMP_CLASS.push( className )
  if ( secondary ) COMP_CLASS.push( `${ BASE_CLASS }--secondary` )
  if ( danger ) COMP_CLASS.push( `${ BASE_CLASS }--danger` )

  if ( to ) {
    return (
      <Link to={to} className={ COMP_CLASS.join(` `) } {...others} >
        { props.children }
      </Link>
    )
  }

  return (
    <button className={ COMP_CLASS.join(` `) } {...others} >
      { props.children }
    </button>
  )
}

export function BtnFab( props ) {
  const { className, ...others } = props
  const btnClass = [ `${BASE_CLASS}--fab` ]
  if ( className ) btnClass.push( className )
  return (
    <Button
      className={ btnClass.join(` `) }
      {...others}
    />
)}

export function BtnLink( props ) {
  const { className, ...others } = props
  const btnClass = [ `${BASE_CLASS}--link` ]
  if ( className ) btnClass.push( className )
  return (
    <Button
      className={ btnClass.join(` `) }
      {...others}
    />
)}

export function BtnIcon( props ) {
  const { className, svgId, secondary, link, danger, ...others } = props
  const COMP_CLASS = [ `${BASE_CLASS}--icon` ]
  if ( secondary ) COMP_CLASS.push( `${BASE_CLASS}--icon-secondary` )
  if ( link )      COMP_CLASS.push( `${BASE_CLASS}--icon-link` )
  if ( danger )    COMP_CLASS.push( `${ BASE_CLASS }--icon-danger` )
  if ( className ) COMP_CLASS.push( className )
  return (
    <Button
      className={ COMP_CLASS.join(` `) }
      {...others}
    >
      <Icon svgId={svgId} />
    </Button>
)}
