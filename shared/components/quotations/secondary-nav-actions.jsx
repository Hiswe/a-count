import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Button, BtnSecondary } from '../ui/buttons.jsx'
import Icon from '../ui/svg-icons.jsx'
import { BASE_CLASS } from './form.pres.jsx'

export function ButtonList( props ) {
  return (
    <BtnSecondary to="/quotations">
      <Icon svgId="view-list" />
    </BtnSecondary>
  )
}

export function ButtonNew( props ) {
  return (
    <BtnSecondary to="/quotations/new">
      <Icon svgId="note-add" />
    </BtnSecondary>
  )
}

export function ButtonSubmit( props ) {
  const { isSaving } = props
  const iconName = isSaving ? `block` : `save`

  return (
    <Button form={ BASE_CLASS } disabled={ isSaving } type="submit">
      <Icon svgId={ iconName } />
    </Button>
  )
}
