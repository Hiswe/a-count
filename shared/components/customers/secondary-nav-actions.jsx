import React, { Fragment } from 'react'

import { Button, BtnSecondary } from '../ui/buttons.jsx'
import Icon from '../ui/svg-icons.jsx'
import { BASE_CLASS } from './form.pres.jsx'

export function ButtonList() {
  return (
    <BtnSecondary to="/customers">
      <Icon svgId="view-list" />
    </BtnSecondary>
  )
}

export function ButtonNew() {
  return (
    <BtnSecondary to="/customers/new" className="btn-secondary">
      <Icon svgId="person-add" />
    </BtnSecondary>
  )
}

export function ButtonSubmit( props ) {
  const { isSaving } = props
  const iconName = isSaving ? `block` : `save`
  return (
    <Button form={ BASE_CLASS } disabled={ isSaving } type="submit">
      <Icon  svgId={ iconName } />
    </Button>
  )
}
