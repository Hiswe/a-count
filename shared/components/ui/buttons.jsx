import React from 'react'
import { Link } from 'react-router-dom'

import './buttons.scss'
const BASE_CLASS = `button`

export function Button( props ) {
  const { className, to, ...others } = props
  const btnClass = [ BASE_CLASS ]
  if ( className ) btnClass.push( className )

  if ( to ) {
    return (
      <Link to={to} className={ btnClass.join(` `) } {...others} >
        { props.children }
      </Link>
    )
  }

  return (
    <button className={ btnClass.join(` `) } {...others} >
      { props.children }
    </button>
  )
}

export function BtnSecondary( props ) {
  const { className, ...others } = props
  const btnClass = [ `${BASE_CLASS}--secondary` ]
  if ( className ) btnClass.push( className )
  return (
  <Button
    className={ btnClass.join(` `) }
    {...others}
  />
)}

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
