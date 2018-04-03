import React, { Fragment } from 'react'

import { BtnIcon } from '../ui/buttons.jsx'
import { FORM_ID } from './settings.pres.jsx'

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
