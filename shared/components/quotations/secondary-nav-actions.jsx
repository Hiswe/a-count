import React from 'react'

import { BtnIcon } from '../ui/buttons.jsx'
import { FORM_ID } from './form.pres.jsx'

export function ButtonList( props ) {
  return (
    <BtnIcon
      secondary
      to="/quotations"
      svgId="view-list"
    />
  )
}

export function ButtonPrint( props ) {
  return (
    <BtnIcon
      secondary
      to={`/quotations/${ props.id }/print`}
      svgId="print"
    />
  )
}

export function ButtonEdit( props ) {
  return (
    <BtnIcon
      to={`/quotations/${ props.id }`}
      svgId="edit"
    />
  )
}

export function ButtonNew( props ) {
  return (
    <BtnIcon
      secondary
      to="/quotations/new"
      svgId="note-add"
    />
  )
}

export function ButtonSubmit( props ) {
  const { isSaving } = props
  const iconName = isSaving ? `block` : `save`

  return (
    <BtnIcon
      form={ FORM_ID } disabled={ isSaving } type="submit"
      svgId={ iconName }
    />
  )
}
