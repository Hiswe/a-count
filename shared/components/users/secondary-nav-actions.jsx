import React, { Fragment } from 'react'

import { BtnIcon } from '../ui/buttons.jsx'
import { BASE_CLASS } from './form.pres.jsx'

export function ButtonSubmit( props ) {
  const { isSaving } = props
  const iconName = isSaving ? `block` : `save`

  return (
    <BtnIcon
      form={ BASE_CLASS }
      disabled={ isSaving }
      type="submit"
      svgId={ iconName }
    />
  )
}
