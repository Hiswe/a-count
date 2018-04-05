import React from 'react'

import { BtnIcon } from '../ui/buttons.jsx'

export function ButtonList( props ) {
  return (
    <BtnIcon
      secondary
      to={`/${props.type}`}
      svgId="view-list"
    />
  )
}

export function ButtonPrint( props ) {
  return (
    <BtnIcon
      secondary
      to={`/${props.type}/${ props.id }/print`}
      svgId="print"
    />
  )
}

export function ButtonEdit( props ) {
  return (
    <BtnIcon
      to={`/${props.type}/${ props.id }`}
      svgId="edit"
    />
  )
}

export function ButtonNew( props ) {
  const { type } = props
  const iconId = type === `customers` ? `person-add`
    : `note-add`
  return (
    <BtnIcon
      secondary
      to={`/${type}/new`}
      svgId={ iconId }
    />
  )
}
