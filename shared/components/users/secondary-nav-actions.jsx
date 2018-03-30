import React, { Fragment } from 'react'

import { Button, BtnSecondary } from '../ui/buttons.jsx'
import { BASE_CLASS } from './form.pres.jsx'
import Icon from '../ui/svg-icons.jsx'

export function ButtonSubmit( props ) {
  const { isSaving } = props
  const iconName = isSaving ? `block` : `save`

  return (
    <Button form={ BASE_CLASS } disabled={ isSaving } type="submit">
      <Icon svgId={ iconName } />
    </Button>
  )
}
