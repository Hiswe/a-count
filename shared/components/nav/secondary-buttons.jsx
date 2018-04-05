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
  const { type, ...others } = props
  const iconId = type === `customers` ? `person-add`
    : `note-add`
  return (
    <BtnIcon
      to={`/${type}/new`}
      svgId={ iconId }
      {...others}
    />
  )
}

export function ButtonSubmit( props ) {
  const { isSaving, formId } = props
  const iconId = isSaving ? `block` : `save`
  return (
    <BtnIcon
      form={ formId }
      disabled={ isSaving }
      type="submit"
      svgId={ iconId }
    />
  )
}