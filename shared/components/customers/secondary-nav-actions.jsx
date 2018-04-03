import React, { Fragment } from 'react'

import { BtnIcon } from '../ui/buttons.jsx'
import { FORM_ID } from './form.pres.jsx'

export function ButtonList() {
  return (
    <BtnIcon
      secondary
      to="/customers"
      svgId="view-list"
    />
  )
}

export function ButtonNew() {
  return (
    <BtnIcon
      secondary
      to="/customers/new"
      svgId="person-add"
    />
  )
}

export function ButtonSubmit( props ) {
  const { isSaving } = props
  const iconName = isSaving ? `block` : `save`
  return (
    <BtnIcon
      form={ FORM_ID }
      disabled={ isSaving }
      type="submit"
      svgId={ iconName }
    />
  )
}
